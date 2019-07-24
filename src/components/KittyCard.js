import React from 'react';

class KittyCard extends React.Component {
  render() {
    const { kitty } = this.props;

    return(
      <div className="card">
        <h6 className="card-header">{kitty.name}</h6>
        <div className="card-body p-2">
          <div className="row no-gutters my-1">
            <div className="col-3 col-sm-2 font-small">ID:</div>
            <div className="col-9 col-sm-10 font-small">{kitty.id}</div>
          </div>

          <div className="row no-gutters my-1">
            <div className="col-3 col-sm-2 font-small">auction:</div>
            <div className="col-9 col-sm-10 font-small">{kitty.in_auction.toString()}</div>
          </div>

          <div className="row no-gutters my-1">
            <div className="col-3 col-sm-2 font-small">owner:</div>
            <div className="col-9 col-sm-10 font-small">{kitty.owner}</div>
          </div>

          <div className="row no-gutters my-1">
            <div className="col-3 col-sm-2 font-small">pos:</div>
            <div className="col-9 col-sm-10 font-small">{kitty.owner_pos}</div>
          </div>

        </div>
      </div>
    );
  }
}

export default KittyCard;
