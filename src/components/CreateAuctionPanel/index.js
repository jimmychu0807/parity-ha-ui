import React from 'react';

// our own code
import * as substrateService from '../../services/substrateService';

class CreateAuctionPanel extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.moment = window.moment;
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    const form = this.formRef.current;
    const account = form.querySelector("#create-auction-account").value;
    const kittyId = form.querySelector("#create-auction-kitty-id").value;
    const basePrice = form.querySelector("#create-auction-baseprice").value;
    const endDateTime = form.querySelector("#create-auction-enddatetime input").value;
    const unixT = this.moment(endDateTime, "YYYY-MM-DD HH:mm").unix();

    substrateService.startAuction(account, kittyId, basePrice, unixT).then(res => console.log);
  }

  render() {
    return(
      <div>
        <h3>Create Auction</h3>
        <form autoComplete="off" onSubmit={ this.handleSubmit } ref={ this.formRef }>
          <div className="form-group row">
            <label htmlFor="create-auction-account" className="col-sm-3 col-form-label">
              Account:
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="create-auction-account" placeholder="Account"/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="create-auction-kitty-id" className="col-sm-3 col-form-label">
              Kitty ID:
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="create-auction-kitty-id" placeholder="Kitty ID"/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="create-auction-baseprice" className="col-sm-3 col-form-label">
              Base Price:
            </label>
            <div className="col-sm-9">
              <input type="number" className="form-control" id="create-auction-baseprice" placeholder="Base Price"/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="create-auction-enddatetime" className="col-sm-3 col-form-label">
              End DateTime:
            </label>
            <div className="col-sm-9 input-group date" id="create-auction-enddatetime" data-target-input="nearest">
              <input type="text" className="form-control datetimepicker-input" data-target="#create-auction-enddatetime" placeholder="End DateTime"/>
              <div className="input-group-append" data-target="#create-auction-enddatetime" data-toggle="datetimepicker">
                <div className="input-group-text"><i className="fa fa-calendar"></i></div>
              </div>
            </div>
          </div>

          <div className="form-group row justify-content-center">
            <div className="col-6">
              <button type="submit" className="btn btn-primary btn-block">Create</button>
            </div>
          </div>

        </form>
      </div>
    )
  }
}

export default CreateAuctionPanel
