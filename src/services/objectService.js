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
    this.id = parityObj.id.toJSON();
    this.name = parityObj.name.toJSON().map(code => String.fromCharCode(code)).join("");
    this.in_auction = parityObj.in_auction.toJSON();
    this.owner = parityObj.owner.toJSON();
    this.owner_pos = parityObj.owner_pos.toJSON();
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

  constructor(parityObj) {}
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

  constructor(parityObj) {}
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

  constructor(parityObj) {}
}
