import React from 'react';

// own code & libraries
import * as substrateService from '../services/substrateService';

const moment = window.moment();
const jQuery = window.jQuery;
const AUCTION_BID_MODAL_ID = "#auctionBidModal";

class AuctionCard extends React.Component {

  showBidBtn = () => {
    // if not auction kitty owner && status == ongoing && not exceed auction.end_time yet
    const { auction, kitty, acctId } = this.props;
    return !( !acctId || acctId.length === 0 ||
      auction.status.value !== "ongoing" ||
      moment.unix() > auction.end_time.unix() ||
      acctId === kitty.owner);
  }

  showCancelBtn = () => {
    // if status == ongoing && bidCount == 0 && not exceed auction.end_time yet
    const { auction, acctId } = this.props;
    return !(!acctId || acctId.length === 0 ||
      auction.status.value !== "ongoing" ||
      auction.bids_count > 0 ||
      moment.unix() > auction.end_time.unix());
  }

  showCloseBtn = () => {
    // if status == ongoing && exceed auction.end_time
    const { auction, acctId } = this.props;
    return (acctId && acctId.length > 0 &&
      moment.unix() > auction.end_time.unix() &&
      auction.status.value === "ongoing");
  }

  bid = (ev) => {
    ev.preventDefault();
    const { acctId, auction, acctBid, updateAuctionBidModalHandler } = this.props;
    updateAuctionBidModalHandler({acctId, auction, acctBid}, () => {
      jQuery(AUCTION_BID_MODAL_ID).modal("show");
    });
  }

  cancelAuction = (ev) => {
    ev.preventDefault();
    const { auction, acctId } = this.props;
    substrateService.cancelAuction(acctId, auction.id);
  }

  closeAuction = (ev) => {
    ev.preventDefault();
    const { auction, acctId } = this.props;
    substrateService.closeAuction(acctId, auction.id);
  }

  render() {
    const { auction, count } = this.props;

    return(
      <div className="card">
        <h6 className="card-header">auction-{count}</h6>
        <div className="card-body p-2">
          <div className="row no-gutters my-1">
            <div className="col-3 col-sm-2 font-small">ID:</div>
            <div className="col-9 col-sm-10 font-small">{auction.id }</div>
          </div>

          <div className="row no-gutters my-1">
            <div className="col-3 col-sm-2 font-small">status:</div>
            <div className="col-9 col-sm-10 font-small">{auction.status.value }</div>
          </div>

          <div className="row no-gutters my-1">
            <div className="col-3 col-sm-2 font-small">kitty ID:</div>
            <div className="col-9 col-sm-10 font-small">{auction.kitty_id }</div>
          </div>

          <div className="row no-gutters my-1">
            <div className="col-3 col-sm-2 font-small">start:</div>
            <div className="col-9 col-sm-10 font-small">{auction.start_time.format("YYYY-MM-DD HH:mm") }</div>
          </div>

          <div className="row no-gutters my-1">
            <div className="col-3 col-sm-2 font-small">close:</div>
            <div className="col-9 col-sm-10 font-small">{auction.end_time.format("YYYY-MM-DD HH:mm") }</div>
          </div>

          <div className="row no-gutters my-1">
            <div className="col-3 col-sm-2 font-small">price to topmost:</div>
            <div className="col-9 col-sm-10 font-small">{auction.price_to_topmost }</div>
          </div>

          <div className="row no-gutters my-1">
            <div className="col-3 col-sm-2 font-small"># of bids:</div>
            <div className="col-9 col-sm-10 font-small">{auction.bids_count }</div>
          </div>

        </div>

        <div className="card-body p-2">
          <div className="row">
            { this.showBidBtn() && (
              <div className="col-auto mx-auto">
                <button className = "btn btn-primary w-85" onClick={this.bid}>Bid</button>
              </div>
            ) }
            { this.showCancelBtn() && (
              <div className="col-auto mx-auto">
                <button className = "btn btn-primary w-85" onClick={this.cancelAuction}>Cancel</button>
              </div>
            ) }
            { this.showCloseBtn() && (
              <div className="col-auto mx-auto">
                <button className = "btn btn-primary w-85" onClick={this.closeAuction}>Close</button>
              </div>
            ) }
          </div>
        </div>
      </div>
    );
  }
}

export default AuctionCard;