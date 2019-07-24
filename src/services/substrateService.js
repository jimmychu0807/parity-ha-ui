import * as Obj from './objectService';

const { ApiPromise, WsProvider } = require('@polkadot/api');
const testKeyring = require('@polkadot/keyring/testing');

const SUBSTRATE_ADDR = "ws://127.0.0.1:9944/"

export async function connect() {
  const api = await createApiWithTypes();

  const [ chain, nodeName, nodeVersion ] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
}

export async function objsCount(acctId) {
  const api = await createApiWithTypes();
  const isAcctId = acctId && acctId.length > 0;
  const [
    ttKittiesCount, ttAuctionsCount, myKittiesCount
  ] = await Promise.all([
    api.query.catAuction.kittiesCount(),
    api.query.catAuction.auctionsCount(),
    isAcctId ? api.query.catAuction.ownerKittiesCount(acctId) : 0,
  ]);

  return { ttKittiesCount, ttAuctionsCount, myKittiesCount };
}

export async function createKitty(acctId, kitty_name) {
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

export async function fetchKitties() {
  const api = await createApiWithTypes();

  let kittiesCount = await api.query.catAuction.kittiesCount();
  kittiesCount = kittiesCount.toNumber();

  const kittyHashes = await Promise.all([...Array(kittiesCount).keys()].map(i =>
    api.query.catAuction.kittiesArray(i))
  );

  const kitties = await Promise.all(kittyHashes.map(kid =>
    api.query.catAuction.kitties(kid)));

  return kitties.map(kitty => new Obj.Kitty(kitty));
}

export async function startAuction(acctId, kittyId, basePrice, endDateTime) {
  const api = await createApiWithTypes();
  const keyPairAndNonce = await getKeyPairAndNonce(acctId);

  api.tx.catAuction
    .startAuction(kittyId, endDateTime, basePrice)
    .sign(keyPairAndNonce.keyPair, { nonce: keyPairAndNonce.nonce })
    .send( ({ev = [], status}) => {
      console.log('Transaction status:', status.type);
      if (status.isFinalized) {
        console.log(`Completed at block hash: ${status.asFinalized.toHex()}`);
      }
    });
}

// -- private methods below

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
      "Kitty": Obj.Kitty.objType,
      "AuctionTx": Obj.AuctionTx.objType,
      "Auction": Obj.Auction.objType,
      "Bid": Obj.Bid.objType,
    }
  });
}
