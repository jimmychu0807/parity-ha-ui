import React from 'react';

// our own code
// import { SignerBond } from '../../substrate-ui/AccountIdBond';

class CreateKittyPanel extends React.Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    let form = this.formRef.current;
    const account = form.querySelector("#create-kitty-account").value;
    const kitty_name = form.querySelector("#create-kitty-kname").value;


  }

  render() {
    return(
      <div>
        <h3>Create Kitty</h3>
        <form autoComplete="off" onSubmit={ this.handleSubmit } ref={ this.formRef }>
          <div className="form-group row">
            <label htmlFor="create-kitty-account" className="col-sm-3 col-form-label">Account:</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="create-kitty-account" placeholder="Account"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="create-kitty-kname" className="col-sm-3 col-form-label">Kitty Name:</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="create-kitty-kname" placeholder="Name"/>
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <div className="col-6">
              <button type="submit" className="btn btn-primary btn-block">Create</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateKittyPanel;
