// 3rd-party libs
import React from 'react';
import * as substrateService from '../../services/substrateService';

class AuctionInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { cnts: {} };
  }

  componentDidMount() {
    substrateService.current_count().then(res => {
      this.setState({
        cnts: Object.assign({}, ...Object.keys(res).map(k => ({ [k]: res[k].toNumber()})))
      })
    });
  }

  render() {
    return(<React.Fragment>
      <div className="row">
        <div className="col-12">
          Current kitten count: { this.state.cnts['kittiesCount'] }
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          Current auction count: { this.state.cnts['auctionsCount'] }
        </div>
      </div>
    </React.Fragment>);
  }
}

export default AuctionInfo;
