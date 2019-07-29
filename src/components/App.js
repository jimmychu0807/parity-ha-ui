// 3rd-party libs
import React from 'react';

// our own codes
import SetAcctIdPanel from './SetAcctIdPanel';
import AuctionInfo from './AuctionInfo';
import KittiesPanel from './KittiesPanel';
import AuctionsPanel from './AuctionsPanel';

import AuctionBidModal from './AuctionBidModal';
import CreateKittyModal from './CreateKittyModal';
import CreateAuctionModal from './CreateAuctionModal';
import EventToast from './EventToast';

// services
import * as substrateService from '../services/substrateService'
import * as dataService from '../services/dataService'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acctId: dataService.getAcctId(),
      toastMsgs: [],
    };
    this.auctionInfoRef = React.createRef();
    this.kittiesPanelRef = React.createRef();
    this.auctionsPanelRef = React.createRef();
    this.auctionBidModalRef = React.createRef();
    this.createKittyModalRef = React.createRef();
    this.createAuctionModalRef = React.createRef();
    this.eventToastRef = React.createRef();
  }

  componentDidMount() {
    // just to show that it is connected to the substrate runtime via ws
    substrateService.connect();
  }

  setAcctIdHandler = (acctId) => {
    this.setState({ acctId: acctId });
    dataService.setAcctId(acctId);
    window.location.reload();
  }

  rmAcctIdHandler = () => {
    this.setState({ acctId: '' });
    dataService.removeAcctId();
    window.location.reload();
  }

  updateAuctionBidModalHandler = (opt, callback) => {
    const auctionBidModal = this.auctionBidModalRef.current;
    auctionBidModal.setState(opt, callback);
  }

  showCreateKittyModal = (ev) => {
    ev.preventDefault();
    const modal = this.createKittyModalRef.current;
    modal.showModal();
  }

  showCreateAuctionModal = (ev) => {
    ev.preventDefault();
    const modal = this.createAuctionModalRef.current;
    modal.showModal();
  }

  insertToastMsg = (title, content, msgStatus, bAutoHide) => {
    let { toastMsgs } = this.state;
    toastMsgs.push({title, content, msgStatus});
    this.setState({toastMsgs});
    this.eventToastRef.current.showToasts(bAutoHide, this.rmToastMsgs);
  }

  rmToastMsgs = () => {
    this.setState({ toastMsgs: []});
  }

  refreshKitties = () => {
    const auctionInfo = this.auctionInfoRef.current;
    auctionInfo.refreshData();
    const kittiesPanel = this.kittiesPanelRef.current;
    kittiesPanel.fetchKitties();
  }

  refreshAuctions = () => {
    const auctionInfo = this.auctionInfoRef.current;
    auctionInfo.refreshData();
    const kittiesPanel = this.kittiesPanelRef.current;
    kittiesPanel.fetchKitties();
    const auctionsPanel = this.auctionsPanelRef.current;
    auctionsPanel.refreshData();
  }

  render() {
    const { acctId, toastMsgs } = this.state;
    const isAcctId = acctId && acctId.length > 0;

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="m-2 p-2 border rounded">
            <SetAcctIdPanel acctId = { acctId } setAcctIdHandler = { this.setAcctIdHandler }
              rmAcctIdHandler = { this.rmAcctIdHandler } />
          </div>

          <div className="m-2 p-2 border rounded">
            <AuctionInfo ref={this.auctionInfoRef} acctId={ acctId }/>
          </div>

          {/* Two action buttons */}
          <div className="m-2 p-2 border rounded">
            <div className="row">
              <div className="col-6">
                <button className="btn btn-primary btn-block" onClick={ this.showCreateKittyModal }
                  disabled={!isAcctId}>Create Kitty</button>
              </div>
              <div className="col-6">
                <button className="btn btn-primary btn-block" onClick={ this.showCreateAuctionModal }
                  disabled={!isAcctId}>Create Auction</button>
              </div>
            </div>
          </div>

          {/* Kitties Panel */}
          <div className="m-2 p-2 border rounded">
            <KittiesPanel ref={this.kittiesPanelRef} acctId={ acctId }/>
          </div>

          {/* Auctions Panel */}
          <div className="m-2 p-2 border rounded">
            <AuctionsPanel ref={this.auctionsPanelRef} acctId={ acctId }
              insertToastMsgHandler={this.insertToastMsg}
              refreshAuctionsHandler={this.refreshAuctions}
              updateAuctionBidModalHandler = {this.updateAuctionBidModalHandler}/>
          </div>
        </div>

        {/* Modal Dialogs */}
        <AuctionBidModal ref={this.auctionBidModalRef}
          insertToastMsgHandler={this.insertToastMsg}
          refreshKittiesHandler={this.refreshKitties} />
        <CreateKittyModal ref={this.createKittyModalRef} acctId={acctId}
          insertToastMsgHandler={this.insertToastMsg}
          refreshKittiesHandler={this.refreshKitties} />
        <CreateAuctionModal ref={this.createAuctionModalRef} acctId={acctId}
          insertToastMsgHandler={this.insertToastMsg}
          refreshAuctionsHandler={this.refreshAuctions} />

        {/* Event Toast Msgs */}
        <EventToast ref={this.eventToastRef} toastMsgs={toastMsgs}/>

      </React.Fragment>
    );
  }
}

export default App;
