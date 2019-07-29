// 3rd-party libs
import React from 'react';

// our own code
import * as substrateService from '../services/substrateService';

class AuctionInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cnts: {},
      myBalance: null
    };
    this.fetchCounts();
    this.fetchBalance();
  }

  fetchCounts = async () => {
    const objsCount = await substrateService.objsCount(this.props.acctId);
    this.setState({
      cnts: Object.assign({}, ...Object.keys(objsCount).map(k => ({ [k]: objsCount[k].toString()}))),
    });
  }

  fetchBalance = async () => {
    if (!this.props.acctId) return;

    this.setState({
      myBalance: await substrateService.fetchFreeBalance(this.props.acctId),
    });
  }

  refreshData = async() => {
    return Promise.all([ this.fetchCounts(), this.fetchBalance()]);
  }

  render() {
    const { acctId } = this.props;
    const { myBalance, cnts } = this.state;

    return(<React.Fragment>
      <h5>Info</h5>
      <div className="row">
        <div className="col-12">
          Current Account:
          <strong> { acctId }</strong>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          My free balance:
          <strong> { myBalance }</strong>
        </div>
        <div className="col-sm-6">
          My kitties count:
          <strong> { cnts['myKittiesCount'] }</strong>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          Total auctions count:
          <strong> { cnts['ttAuctionsCount'] }</strong>
        </div>
        <div className="col-sm-6">
          Total kitties count:
          <strong> { cnts['ttKittiesCount'] }</strong>
        </div>
      </div>
    </React.Fragment>);
  }
}

export default AuctionInfo;
