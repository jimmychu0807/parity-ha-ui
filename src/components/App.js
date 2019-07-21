// 3rd-party libs
import React from 'react';
import { Bond, TransformBond } from 'oo7';
import { ReactiveComponent, If, Rspan } from 'oo7-react';
import {
  calls, runtime, chain, system, runtimeUp, ss58Decode, ss58Encode, pretty,
  addressBook, secretStore, metadata, nodeService, bytesToHex, hexToBytes, AccountId
} from 'oo7-substrate';

// our own code
import './Pretty';

class ReactiveApp extends ReactiveComponent {

  constructor() {
    console.log("ReactiveApp init");

    super([], { ensureRuntime: runtimeUp });

    // For debug only.
    window.runtime = runtime;
    window.secretStore = secretStore;
    window.addressBook = addressBook;
    window.chain = chain;
    window.calls = calls;
    window.system = system;
    window.that = this;
    window.metadata = metadata;
  }

  readyRender() {
    return(<App/>)
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    console.log("App init");
  }

  async componentDidMount() {
    console.log("component did mount");
  }

  render() {
    return (
      <div className="App">
        React App
      </div>
    );
  }
}

export default ReactiveApp;
