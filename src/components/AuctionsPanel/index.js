import React from 'react';

// our own code
import AuctionCard from '../AuctionCard';

import * as substrateService from '../../services/substrateService';
import * as dataService from '../../services/dataService';

class AuctionsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { auctions: [], kitties: [], acctId: dataService.getAcctId() };
    this.fetchAuctions();
    this.fetchKitties();
  }

  fetchAuctions = async () => {
    let auctions = await substrateService.fetchAuctions();
    this.setState({ auctions });
  }

  fetchKitties = async () => {
    let kitties = await substrateService.fetchKitties();
    this.setState({ kitties });
  }

  render() {
    const { auctions, kitties, acctId } = this.state;
    return(
      <React.Fragment>
        <h5>Auctions Panel</h5>
        <div className="row">{ auctions.map((auction, i) =>
          <div className="col-md-6 col-lg-4 my-1" key={auction.id}>
            <AuctionCard count={i} auction={auction} acctId={acctId}
              kitty={kitties.find(kitty => auction.kitty_id)}/>
          </div>
        ) }</div>
      </React.Fragment>
    );
  }
}

export default AuctionsPanel;
