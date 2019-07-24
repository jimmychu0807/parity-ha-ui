import React from 'react';

// our own code
import * as substrateService from '../../services/substrateService';

class CreateKittyPanel extends React.Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    let form = this.formRef.current;
    const {acctId} = this.props;
    const kitty_name = form.querySelector("#create-kitty-kname").value;
    form.querySelector("#create-kitty-kname").value = '';

    substrateService.createKitty(acctId, kitty_name).then(res => console.log);
  }

  render() {
    const { acctId } = this.props;
    const isAcctId = acctId && acctId.length > 0;

    return(
      <div>
        <h5>Create Kitty</h5>
        <form autoComplete="off" onSubmit={ this.handleSubmit } ref={ this.formRef }>
          <div className="form-group row">
            <label htmlFor="create-kitty-kname" className="col-sm-3 col-form-label">Kitty Name:</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="create-kitty-kname" placeholder="Name"/>
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <div className="col-6">
              <button type="submit" className="btn btn-primary btn-block"
                disabled={ !isAcctId }>Create Kitty</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateKittyPanel;
