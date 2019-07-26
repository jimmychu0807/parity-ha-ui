import React from 'react';

// our own code
import KittyCard from './KittyCard';

import * as substrateService from '../services/substrateService';

class KittiesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { kitties: [] };
    this.fetchKitties();
  }

  fetchKitties = async () => {
    let kitties = await substrateService.fetchKitties();
    this.setState({ kitties });
  }

  render() {
    const { kitties } = this.state;
    return(
      <React.Fragment>
        <h5>Kitties Panel</h5>
        <div className="row">{ kitties.map(kitty =>
          <div className="col-md-6 col-lg-4 my-1" key={kitty.id}>
            <KittyCard kitty = {kitty} />
          </div>
        ) }</div>
      </React.Fragment>
    );
  }
}

export default KittiesPanel;
