import React from 'react';

// our own code
import { showEventToast } from './EventToast';
import * as substrateService from '../services/substrateService';

const jQuery = window.jQuery;
const KITTY_NAME_INPUT_ID = "create-kitty-kname";

class CreateKittyModal extends React.Component {
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
    modal.querySelector(`#${KITTY_NAME_INPUT_ID}`).value = '';
    jQuery(modal).modal("hide");
  }

  handleCreate = (ev) => {
    ev.preventDefault();

    let modal = this.modalRef.current;
    const {acctId} = this.props;
    const kitty_name = modal.querySelector(`#${KITTY_NAME_INPUT_ID}`).value;
    substrateService.createKitty(acctId, kitty_name, {
      startCallback: (title, body) => { showEventToast(title, body) },
      finishCallback: () => {},
    });

    // handling UI stuff
    this.clearFormAndHide();
  }

  render() {
    return(
      <div id="createKittyModal" className="modal fade" tabIndex="-1" role="dialog"
        aria-hidden="true" data-backdrop='static'  ref={this.modalRef}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Create Kitty</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form autoComplete="off" id="createKittyForm" className="modal-body">
              <div className="form-group row">
                <label htmlFor={KITTY_NAME_INPUT_ID} className="col-sm-3 col-form-label">Kitty Name:</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id={KITTY_NAME_INPUT_ID} placeholder="Name"/>
                </div>
              </div>
            </form>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary w-85" onClick={this.handleCreate}>Create</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default CreateKittyModal;
