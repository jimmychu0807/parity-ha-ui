import React from 'react';

// our own code
import AuctionCard from './AuctionCard';

import * as substrateService from '../services/substrateService';

class AuctionsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { kitties: [], auctions: [], bids: [] };
    this.refreshData();
  }

  async refreshData() {
    const { acctId } = this.props;
    const auctions = await substrateService.fetchAuctions();

    this.setState({
      auctions,
      kitties: await substrateService.fetchKitties(),
      bids: await substrateService.fetchUserAuctionBids(acctId, auctions.map(a => a.id)),
    });
  }

  render() {
    const { acctId, updateAuctionBidModalHandler, insertToastMsgHandler,
      refreshAuctionsHandler } = this.props;
    const { auctions, kitties, bids } = this.state;

    return(
      <React.Fragment>
        <h5>Auctions Panel</h5>
        <div className="card-deck">{
          auctions.map((auction, i) =>
            <div className="col-md-6 col-lg-4 my-1 d-flex" key={auction.id}>
              <AuctionCard count={i} auction={auction} acctId={acctId}
                kitty={kitties.find(kitty => kitty.id === auction.kitty_id)}
                acctBid={bids.find(bid => bid.auction_id === auction.id)}
                insertToastMsgHandler={insertToastMsgHandler}
                refreshAuctionsHandler={refreshAuctionsHandler}
                updateAuctionBidModalHandler = {updateAuctionBidModalHandler}/>
            </div>
          )
        }</div>
      </React.Fragment>
    );
  }
}

export default AuctionsPanel;
