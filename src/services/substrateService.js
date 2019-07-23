const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const testKeyring = require('@polkadot/keyring/testing');
const { stringToU8a } = require('@polkadot/util');

const SUBSTRATE_ADDR = "ws://127.0.0.1:9944/"

async function connect() {
  const api = await createApiWithTypes();

  const [ chain, nodeName, nodeVersion ] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  // console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
}

async function current_count() {
  const api = await createApiWithTypes();

  const [ kittiesCount, auctionsCount ] = await Promise.all([
    api.query.catAuction.kittiesCount(),
    api.query.catAuction.auctionsCount(),
  ]);

  // console.log(`kittiesCount: ${kittiesCount} | auctionsCount: ${auctionsCount}`);
  return { kittiesCount, auctionsCount };
}

async function create_kitty(acctId, kitty_name) {
  const api = await createApiWithTypes();
  const keyPairAndNonce = await getKeyPairAndNonce(acctId);

  api.tx.catAuction
    .createKitty(kitty_name)
    .sign(keyPairAndNonce.keyPair, { nonce: keyPairAndNonce.nonce })
    .send( ({ev = [], status}) => {
      console.log('Transaction status:', status.type);
      if (status.isFinalized) {
        console.log(`Completed at block hash: ${status.asFinalized.toHex()}`);
      }
    });
}

async function getKeyPairAndNonce(acctId) {
  const api = await createApiWithTypes();
  const keyring = testKeyring.default();
  const nonce = await api.query.system.accountNonce(acctId);
  const keyPair = keyring.getPair(acctId);
  return { keyPair, nonce };
}

async function createApiWithTypes() {
  return await ApiPromise.create({
    provider: new WsProvider(SUBSTRATE_ADDR),
    types: {
      "AuctionStatus": {
        "_enum": [ "Ongoing", "Cancelled", "Closed" ]
      },
      "BidStatus": {
        "_enum": [ "Active", "Withdrawn" ]
      },
      "Kitty": {
        "id": "Hash",
        "name": "Option<Vec<u8>>",
        "owner": "Option<AccountId>",
        "owner_pos": "Option<u64>",
        "in_auction": "bool"
      },
      "AuctionTx": {
        "tx_time": "Moment",
        "winner": "AccountId",
        "tx_price": "Balance"
      },
      "Auction": {
        "id": "Hash",
        "kitty_id": "Hash",
        "base_price": "Balance",
        "start_time": "Moment",
        "end_time": "Moment",
        "status": "AuctionStatus",

        "topmost_bids": "Vec<Hash>",
        "price_to_topmost": "Balance",
        "display_bids": "Vec<Hash>",
        "display_bids_last_update": "Moment",

        "tx": "Option<AuctionTx>"
      },
      "Bid": {
        "id": "Hash",
        "auction_id": "Hash",
        "bidder": "AccountId",
        "price": "Balance",
        "last_update": "Moment",
        "status": "BidStatus"
      }
    }
  });
}

export { connect, current_count, create_kitty }
