import * as Obj from './objectService';

const { ApiPromise, WsProvider } = require('@polkadot/api');
const testKeyring = require('@polkadot/keyring/testing');

const SUBSTRATE_ADDR = process.env.REACT_APP_SUBSTRATE_ADDR;
const NULL_ID = "0x0000000000000000000000000000000000000000000000000000000000000000";

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

export async function fetchFreeBalance(acctId) {
  const api = await createApiWithTypes();
  return (await api.query.balances.freeBalance(acctId)).toJSON();
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

export async function fetchAuctions() {
  const api = await createApiWithTypes();

  let auctionsCount = await api.query.catAuction.auctionsCount();
  auctionsCount = auctionsCount.toNumber();

  const auctionHashes = await Promise.all([...Array(auctionsCount).keys()].map(i =>
    api.query.catAuction.auctionsArray(i))
  );

  const auctions = await Promise.all(auctionHashes.map(aid =>
    api.query.catAuction.auctions(aid)));

  const auctionBidsCount = await Promise.all(auctionHashes.map(aid =>
    api.query.catAuction.auctionBidsCount(aid)));

  return auctions.map((auction, i) => new Obj.Auction(auction, auctionBidsCount[i]));
}

export async function fetchUserAuctionBids(acctId, aids) {
  let bids = await Promise.all(aids.map( aid => fetchUserAuctionBid(acctId, aid) ));
  bids = bids.filter(bid => bid !== null);
  return bids;
}

export async function fetchUserAuctionBid(acctId, aid) {
  const api = await createApiWithTypes();
  const bid_id = await api.query.catAuction.auctionBidderBids([aid, acctId]);

  if (bid_id.toJSON() === NULL_ID) return null;

  const bid = await api.query.catAuction.bids(bid_id);
  return new Obj.Bid(bid);
}

export async function substrateTx(acctId, mainCallback,
  {eventCallback, successCallback, failureCallback}) {
  let api = await createApiWithTypes();
  const keyPairAndNonce = await getKeyPairAndNonce(api, acctId);

  api = api.tx.catAuction;
  mainCallback(api)
    .sign(keyPairAndNonce.keyPair, { nonce: keyPairAndNonce.nonce })
    .send( ({events = [], status}) => {
      console.log('Transaction status:', status.type);
      if (!status.isFinalized) {
        return eventCallback("Substrate", "Submitting transaction...");
      }

      // status.isFinalized === true
      console.log(`Completed at block hash: ${status.asFinalized.toHex()}`);
      events.forEach(({ phase, event: {data, method, section} }) => {
        if (section !== "system") {
          return eventCallback(`${section}.${method}`, data.toJSON().join('<br/>'));
        }
        // section === "system"
        return (method === "ExtrinsicSuccess" ?
          successCallback(`SUCCESS: ${section}.${method}`):
          failureCallback(`FAILURE: ${section}.${method}`));
      });
    });
}

export async function createKitty(acctId, kitty_name, callbacks) {
  substrateTx(acctId, api => api.createKitty(kitty_name), callbacks);
}

export async function startAuction(acctId, kittyId, basePrice, endDateTime, callbacks) {
  substrateTx(acctId, api => api.startAuction(kittyId, endDateTime, basePrice), callbacks);
}

export async function closeAuction(acctId, auctionId, callbacks) {
  substrateTx(acctId, api => api.closeAuctionAndTx(auctionId), callbacks);
}

export async function cancelAuction(acctId, auctionId, callbacks) {
  substrateTx(acctId, api => api.cancelAuction(auctionId), callbacks);
}

export async function bid(acctId, auctionId, bidPrice, callbacks) {
  substrateTx(acctId, api => api.bid(auctionId, bidPrice), callbacks);
}

// -- private(not exported) methods below

async function getKeyPairAndNonce(api, acctId) {
  const keyring = testKeyring.default();
  const nonce = await api.query.system.accountNonce(acctId);
  const keyPair = keyring.getPair(acctId);
  return { keyPair, nonce };
}

async function createApiWithTypes() {
  return await ApiPromise.create({
    provider: new WsProvider(SUBSTRATE_ADDR),
    types: {
      "AuctionStatus": Obj.AuctionStatus.objType,
      "BidStatus": Obj.BidStatus.objType,
      "Kitty": Obj.Kitty.objType,
      "AuctionTx": Obj.AuctionTx.objType,
      "Auction": Obj.Auction.objType,
      "Bid": Obj.Bid.objType,
    }
  });
}
