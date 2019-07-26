const moment = window.moment;

export class AuctionStatus {
  static get objType() {
    return({ "_enum": [ "Ongoing", "Cancelled", "Closed" ] });
  }

  static status(parityStatus) {
    if (parityStatus.hasOwnProperty("Ongoing")) return "ongoing";
    if (parityStatus.hasOwnProperty("Cancelled")) return "cancelled";
    if (parityStatus.hasOwnProperty("Closed")) return "closed";
    throw `Unknown AuctionStatus: ${parityStatus}`;
  }
}

export class BidStatus {
  static get objType() {
    return({ "_enum": [ "Active", "Withdrawn" ] });
  }

  static status(parityStatus) {
    if (parityStatus.hasOwnProperty("Active")) return "active";
    if (parityStatus.hasOwnProperty("Withdrawn")) return "withdrawn";
    throw `Unknown BidStatus: ${parityStatus}`;
  }
}

export class Kitty {
  static get objType() {
    return({
      "id": "Hash",
      "name": "Option<Vec<u8>>",
      "owner": "Option<AccountId>",
      "owner_pos": "Option<u64>",
      "in_auction": "bool"
    });
  }

  constructor(parityObj) {
    let obj = parityObj.toJSON();
    obj.name = obj.name.map(c => String.fromCharCode(c)).join("");
    return obj;
  }
}

export class AuctionTx {
  static get objType() {
    return({
      "tx_time": "Moment",
      "winner": "AccountId",
      "tx_price": "Balance"
    });
  }

  constructor(parityObj) {
    let obj = parityObj.toJSON();
    obj.tx_time = moment.unix(obj.tx_time);
    return obj;
  }
}

export class Auction {
  static get objType() {
    return({
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
    });
  }

  constructor(parityObj, bidsCountParityObj = null) {
    let obj = parityObj.toJSON();
    obj.start_time = moment.unix(obj.start_time);
    obj.end_time = moment.unix(obj.end_time);
    obj.display_bids_last_update = moment.unix(obj.display_bids_last_update);
    obj.status = AuctionStatus.status(obj.status);
    obj.tx = parityObj.tx.toJSON() && new AuctionTx(parityObj.tx);
    obj.bids_count = bidsCountParityObj && bidsCountParityObj.toJSON();
    return obj;
  }
}

export class Bid {
  static get objType() {
    return({
      "id": "Hash",
      "auction_id": "Hash",
      "bidder": "AccountId",
      "price": "Balance",
      "last_update": "Moment",
      "status": "BidStatus"
    });
  }

  constructor(parityObj) {
    let obj = parityObj.toJSON();
    obj.last_update = moment.unix(obj.last_update);
    obj.status = BidStatus.status(obj.status);
    return obj;
  }
}
