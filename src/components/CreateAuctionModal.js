import React from 'react';

// our own code
import * as substrateService from '../services/substrateService';

const jQuery = window.jQuery;
const moment = window.moment;

class CreateAuctionModal extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }

  showModal = () => {
    const modal = this.modalRef.current;
    jQuery(modal).modal("show");
  }

  clearFormAndHide = () => {
    const modal = this.modalRef.current;

    // clear the form value
    modal.querySelector("#create-auction-kitty-id").value = '';
    modal.querySelector("#create-auction-baseprice").value = '';
    modal.querySelector("#create-auction-enddatetime input").value = '';

    jQuery(modal).modal("hide");
  }

  handleCreate = (ev) => {
    ev.preventDefault();

    const { acctId } = this.props;
    const modal = this.modalRef.current;

    const kittyId = modal.querySelector("#create-auction-kitty-id").value;
    const basePrice = modal.querySelector("#create-auction-baseprice").value;
    const endDateTime = modal.querySelector("#create-auction-enddatetime input").value;
    const unixT = moment(endDateTime, "YYYY-MM-DD HH:mm").unix();

    substrateService.startAuction(acctId, kittyId, basePrice, unixT);

    this.clearFormAndHide();
  }

  render() {
    return(<div id="createAuctionModal" className="modal fade" tabIndex="-1" role="dialog"
      aria-hidden="true" data-backdrop='static'  ref={this.modalRef}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Create Auction</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <form autoComplete="off" id="createAuctionForm" className="modal-body">
            <div className="form-group row">
              <label htmlFor="create-auction-kitty-id" className="col-sm-3 col-form-label">Kitty ID:</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="create-auction-kitty-id" placeholder="Kitty ID"/>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="create-auction-baseprice" className="col-sm-3 col-form-label">Base Price:</label>
              <div className="col-sm-9">
                <input type="number" className="form-control" id="create-auction-baseprice" placeholder="Base Price"/>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="create-auction-enddatetime" className="col-sm-3 col-form-label">End Time:</label>
              <div className="col-sm-9 input-group date" id="create-auction-enddatetime" data-target-input="nearest">
                <input type="text" className="form-control datetimepicker-input" data-target="#create-auction-enddatetime" placeholder="End DateTime"/>
                <div className="input-group-append" data-target="#create-auction-enddatetime" data-toggle="datetimepicker">
                  <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                </div>
              </div>
            </div>
          </form>

          <div className="modal-footer">
            <button type="button" className="btn btn-primary w-85" onClick={this.handleCreate}>Create</button>
          </div>

        </div>
      </div>
    </div>);
  }
}

export default CreateAuctionModal
