// 3rd-party libs
import React from 'react';

// our own codes
import * as substrateService from '../services/substrateService'
import AuctionInfo from './AuctionInfo';
import CreateKittyPanel from './CreateKittyPanel';
import CreateAuctionPanel from './CreateAuctionPanel';

class App extends React.Component {
  async componentDidMount() {
    // component did mount logic
    substrateService.connect();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="m-2 p-2 border rounded">
          <AuctionInfo />
        </div>
        <div className="m-2 p-2 border rounded">
          <CreateKittyPanel />
        </div>
        <div className="m-2 p-2 border rounded">
          <CreateAuctionPanel />
        </div>
      </div>
    );
  }
}

export default App;
