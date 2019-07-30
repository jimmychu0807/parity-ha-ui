import React from 'react';

const ACCT_IDS = {
  Alice:   "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  Bob:     "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
  Charles: "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
  Dave:    "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
  Eve:     "5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",
}

class AcctIdPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true };
  }

  toggleCollapse = (ev) => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    const { collapsed } = this.state;
    const iconClass = (collapsed ? "fa-chevron-down" : "fa-chevron-up")

    return <React.Fragment>
      <div>
        <h5 className="d-inline-block">Sample Account IDs</h5>
        <a data-toggle="collapse" href="#acct-id-panel-collapsable"
          className="float-right" role="button" aria-expanded="false"
          onClick={this.toggleCollapse}>
          <i className={`fas fa-fw ${iconClass}`}/>
        </a>
      </div>
      <div className="collapse" id="acct-id-panel-collapsable">
        <div className="d-flex flex-column">{
          Object.entries(ACCT_IDS).map(([name, acctId]) =>
            <div key={acctId} className="d-flex">
              <div className="p-1 w-25">{name}</div>
              <div className="p-1 w-75 font-weight-bold">{acctId}</div>
            </div>
          )
        }</div>
      </div>
    </React.Fragment>
  }
}

export default AcctIdPanel;
