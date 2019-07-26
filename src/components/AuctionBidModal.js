import React from 'react';

import * as substrateService from '../services/substrateService';

const jQuery = window.jQuery;
const BIDPRICE_INPUT_ID = "auctionBidModal-yourBid";

class AuctionBidModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auction: null,
      acctId: null,
      acctBid: null,
    }

    this.modalRef = React.createRef();
  }

  handleBid = (ev) => {
    ev.preventDefault();

    const modal = this.modalRef.current;
    const { auction, acctId, acctBid } = this.state;
    const bidPrice = modal.querySelector(`#${BIDPRICE_INPUT_ID}`).value;

    // TODO: handle the error case when the new bid is less than the current bid
    if (!acctBid || bidPrice > acctBid.price) {
      substrateService.bid(acctId, auction.id, bidPrice);
    }

    // handling UI stuff
    this.clearFormAndHide();
  }

  clearFormAndHide = () => {
    const modal = this.modalRef.current;
    modal.querySelector(`#${BIDPRICE_INPUT_ID}`).value = '';
    jQuery(modal).modal("hide");
  }

  render() {
    const { auction, acctId, acctBid } = this.state;

    if (!(auction && acctId)) return null;

    return(
      <div id="auctionBidModal" className="modal fade" tabIndex="-1" role="dialog"
        aria-hidden="true" data-backdrop='static' ref={this.modalRef}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Auction Bidding</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form id="auctionBidForm" className="modal-body">
              <div className="row">
                <label htmlFor="auctionBidModal-aid" className="col-sm-4 col-form-label">Auction ID</label>
                <div className="col-sm-8">
                  <input id="auctionBidModal-aid" type="text" readOnly
                    className="form-control-plaintext" defaultValue={auction.id}/>
                </div>
              </div>

              <div className="row">
                <label htmlFor="auctionBidModal-kid" className="col-sm-4 col-form-label">Kitty ID</label>
                <div className="col-sm-8">
                  <input id="auctionBidModal-kid" type="text" readOnly
                    className="form-control-plaintext" defaultValue={auction.kitty_id}/>
                </div>
              </div>

              <div className="row">
                <label htmlFor="auctionBidModal-ptt" className="col-sm-4 col-form-label">Price to topmost</label>
                <div className="col-sm-8">
                  <input id="auctionBidModal-ptt" type="number" readOnly
                    className="form-control-plaintext" defaultValue={auction.price_to_topmost}/>
                </div>
              </div>

              { acctBid && (<div className="row">
                <label htmlFor="auctionBidModal-yourCurrentBid" className="col-sm-4 col-form-label">Your current bid</label>
                <div className="col-sm-8">
                  <input id="auctionBidModal-yourCurrentBid" type="number" readOnly
                    className="form-control-plaintext" defaultValue={acctBid.price}/>
                </div>
              </div>) }

              <div className="row">
                <label htmlFor={BIDPRICE_INPUT_ID} className="col-sm-4 col-form-label">
                  { acctBid ? "Your new bid" : "Your bid" }
                </label>
                <div className="col-sm-8">
                  <input id={BIDPRICE_INPUT_ID} type="number"
                    className="form-control" defaultValue={acctBid ? acctBid.price : ""}/>
                </div>
              </div>
            </form>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary w-85" onClick={this.handleBid}>Bid</button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default AuctionBidModal;
