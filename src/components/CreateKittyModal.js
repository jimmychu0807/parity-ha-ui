import React from 'react';

// our own code
import * as substrateService from '../services/substrateService';

const MIN_KITTY_NAME_LEN = 3;
const KITTY_NAME_INPUT_ID = "create-kitty-kname";

const jQuery = window.jQuery;

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
    jQuery(modal).modal("hide");

    // remove input value
    modal.querySelector(`#${KITTY_NAME_INPUT_ID}`).value = '';

    // remove `was-validated` class
    const form = modal.getElementsByTagName("form")[0];
    form.classList.remove('was-validated');
  }

  handleCreate = (ev) => {
    ev.preventDefault();
    const modal = this.modalRef.current;
    const form = modal.getElementsByTagName("form")[0];
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const kitty_name = modal.querySelector(`#${KITTY_NAME_INPUT_ID}`).value;
    const { acctId, insertToastMsgHandler, refreshKittiesHandler } = this.props;

    substrateService.createKitty(acctId, kitty_name, {
      eventCallback: (title, content) => insertToastMsgHandler(title, content, "event", false),
      successCallback: (title, content) => {
        insertToastMsgHandler(title, content, "success", true);
        refreshKittiesHandler();
      },
      failureCallback: (title, content) => insertToastMsgHandler(title, content, "failure", true),
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
              <button type="button" className="close" onClick={this.clearFormAndHide} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form autoComplete="off" id="createKittyForm" className="modal-body">
              <div className="form-group row">
                <label htmlFor={KITTY_NAME_INPUT_ID} className="col-sm-3 col-form-label">Kitty Name:</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id={KITTY_NAME_INPUT_ID}
                    required={true} minLength={MIN_KITTY_NAME_LEN}
                    placeholder="Name"/>
                  <div className="invalid-feedback">
                    {`kitty name has to be at least ${MIN_KITTY_NAME_LEN} characters long`}
                  </div>
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
