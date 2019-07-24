// 3rd-party libs
import React from 'react';

// our own codes
import SetAcctIdPanel from './SetAcctIdPanel';
import AuctionInfo from './AuctionInfo';
import CreateKittyPanel from './CreateKittyPanel';
import CreateAuctionPanel from './CreateAuctionPanel';
import KittiesPanel from './KittiesPanel';
import AuctionsPanel from './AuctionsPanel';

// services
import * as substrateService from '../services/substrateService'
import * as dataService from '../services/dataService'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acctId: dataService.getAcctId(),
    };
  }

  async componentDidMount() {
    // component did mount logic
    substrateService.connect();
  }

  setAcctIdHandler = (acctId) => {
    this.setState({ acctId: acctId });
    dataService.setAcctId(acctId);
  }

  rmAcctIdHandler = () => {
    this.setState({ acctId: '' });
    dataService.removeAcctId();
  }

  render() {
    const { acctId } = this.state;

    return (
      <div className="container-fluid">
        <div className="m-2 p-2 border rounded">
          <SetAcctIdPanel acctId = { acctId } setAcctIdHandler = { this.setAcctIdHandler }
            rmAcctIdHandler = { this.rmAcctIdHandler } />
        </div>

        <div className="m-2 p-2 border rounded">
          <AuctionInfo acctId={ acctId }/>
        </div>
        <div className="m-2 p-2 border rounded">
          <CreateKittyPanel acctId={ acctId }/>
        </div>
        <div className="m-2 p-2 border rounded">
          <CreateAuctionPanel acctId={ acctId }/>
        </div>
        <div className="m-2 p-2 border rounded">
          <KittiesPanel acctId={ acctId }/>
        </div>
        <div className="m-2 p-2 border rounded">
          <AuctionsPanel acctId={ acctId }/>
        </div>
      </div>
    );
  }
}

export default App;
