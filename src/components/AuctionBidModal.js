import React from 'react';

class AuctionBidModal extends React.Component {
  render() {
    return(
      <div id="auctionBidModal" className="modal fade" tabIndex="-1" role="dialog"
        aria-hidden="true" data-backdrop='static'>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Auction Bidding</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary w-85">Bid</button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default AuctionBidModal;
