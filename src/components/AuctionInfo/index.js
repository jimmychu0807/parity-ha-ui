// 3rd-party libs
import React from 'react';

// our own code
import * as substrateService from '../../services/substrateService';

class AuctionInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { cnts: {} };
    this.fetchCounts();
  }

  fetchCounts = () => {
    substrateService.objsCount(this.props.acctId).then(res => {
      this.setState({
        cnts: Object.assign({}, ...Object.keys(res).map(k => ({ [k]: res[k].toString()})))
      })
    });
  }

  render() {
    return(<React.Fragment>
      <h5>Info</h5>
      <div className="row">
        <div className="col-sm-6">
          Total kitties count: { this.state.cnts['ttKittiesCount'] }
        </div>
        <div className="col-sm-6">
          My kitties count: { this.state.cnts['myKittiesCount'] }
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          Total auctions count: { this.state.cnts['ttAuctionsCount'] }
        </div>
      </div>
    </React.Fragment>);
  }
}

export default AuctionInfo;
