import React from 'react';

// our own code
import AuctionCard from '../AuctionCard';

import * as substrateService from '../../services/substrateService';

class AuctionsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { auctions: [] };
    this.fetchAuctions();
  }

  fetchAuctions = async () => {
    let auctions = await substrateService.fetchAuctions();
    this.setState({ auctions });
  }

  render() {
    const { auctions } = this.state;
    return(
      <React.Fragment>
        <h5>Auctions Panel</h5>
        <div className="row">{ auctions.map((auction, i) =>
          <div className="col-md-6 col-lg-4 my-1" key={auction.id}>
            <AuctionCard auction = {auction} count = {i}/>
          </div>
        ) }</div>
      </React.Fragment>
    );
  }
}

export default AuctionsPanel;
