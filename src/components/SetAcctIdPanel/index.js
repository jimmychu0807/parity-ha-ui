import React from 'react';

class SetAcctIdPanel extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const form = this.formRef.current;
    const acctId = form.querySelector("#set-acct-input").value;
    this.props.setAcctIdHandler(acctId);
  }

  handleClear = (ev) => {
    ev.preventDefault();
    const form = this.formRef.current;
    form.querySelector("#set-acct-input").value = '';
    this.props.rmAcctIdHandler();
  }

  render() {
    let { acctId } = this.props;

    return(
      <React.Fragment>
        <h5>Set Account</h5>
        <form autoComplete="off" onSubmit={ this.handleSubmit } ref={ this.formRef }>
          <div className="form-row align-items-center">
            <div className="col-sm-9 my-1">
              <label className="sr-only" htmlFor="set-acct-input">Account</label>
              <input type="text" className="form-control" id="set-acct-input" placeholder="Account ID"
                defaultValue={ acctId } />
            </div>

            <div className="col-sm-3 my-1">
              { acctId && acctId.length > 0
                ? <button type="button" className="btn btn-primary" onClick={ this.handleClear }>Clear</button>
                : <button type="submit" className="btn btn-primary">Set</button>
              }
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

export default SetAcctIdPanel;
