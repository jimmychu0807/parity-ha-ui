import React from 'react';

class AuctionCard extends React.Component {

  showBidBtn = () => {
    return true;
  }

  showCancelBtn = () => {
    return true;
  }

  showCloseBtn = () => {
    return true;
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
              <div className="col-auto mr-auto">
                <button className = "btn btn-primary">Bid</button>
              </div>
            ) }
            { this.showCancelBtn() && (
              <div className="col-auto mr-auto">
                <button className = "btn btn-primary">Cancel</button>
              </div>
            ) }
            { this.showCloseBtn() && (
              <div className="col-auto mr-auto">
                <button className = "btn btn-primary">Close</button>
              </div>
            ) }
          </div>
        </div>
      </div>
    );
  }
}

export default AuctionCard;
