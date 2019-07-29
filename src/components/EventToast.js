import React from 'react';

const classNames = require('classnames');
const jQuery = window.jQuery;
const SHOWN_SEC_BEFORE_HIDE = 4000;

class EventToast extends React.Component {
  constructor(props) {
    super(props);

    this.selfRef = React.createRef();
  }

  showToasts = (bAutoHide, rmToastMsgHandler) => {
    let $toasts = jQuery(this.selfRef.current).find(".toast");
    $toasts.toast('show');

    if (!bAutoHide) return;
    setTimeout(() => {
      $toasts.toast('dispose');
      // wait another 500ms so the toast hiding animation can be finished
      setTimeout(() => rmToastMsgHandler(), 500);
    }, SHOWN_SEC_BEFORE_HIDE);
  }

  render() {
    const { toastMsgs } = this.props;

    return <div className="toasts-container" aria-live="polite" aria-atomic="true" ref={this.selfRef}>
      <div className="toasts-positioning">
        { toastMsgs.map( ({title, content, msgStatus}, i) => {

          const toastHeaderClass = classNames("toast-header", {
            "bg-success": msgStatus === "success",
            "bg-danger": msgStatus === "failure",
            "text-light": msgStatus === "success" || msgStatus === "failure"
          });

          const showContent = content && content.length > 0;

          return <div key={i} className="toast" role="alert" aria-live="assertive"
            aria-atomic="true" data-autohide="false">
            <div className={toastHeaderClass}>
              <strong className="mr-auto">{title}</strong>
              <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            { showContent && <div className="toast-body" dangerouslySetInnerHTML={{__html: content}}/> }
          </div>
        } ) }
      </div>
    </div>
  }
}

export default EventToast;
