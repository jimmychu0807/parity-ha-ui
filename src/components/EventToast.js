import React from 'react';

const jQuery = window.jQuery;
const SHOWN_SEC_BEFORE_HIDE = 4000;

class EventToast extends React.Component {
  constructor(props) {
    super(props);

    this.selfRef = React.createRef();
  }

  showToasts = (bAutoHide) => {
    let $toasts = jQuery(this.selfRef.current).find(".toast");
    $toasts.toast('show');
    if (bAutoHide) {
      setTimeout(() => $toasts.toast('hide'), SHOWN_SEC_BEFORE_HIDE);
    }
  }

  render() {
    const { toastMsgs } = this.props;

    return <div className="toasts-container" aria-live="polite" aria-atomic="true" ref={this.selfRef}>
      <div className="toasts-positioning">
        { toastMsgs.map(({title, content}, i) =>
          <div key={i} className="toast" role="alert" aria-live="assertive"
            aria-atomic="true" data-autohide="false">
            <div className="toast-header">
              <strong className="mr-auto">{title}</strong>
              <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* we want to display html formatting here, thus using `dangerouslySetInnerHTML` */}
            <div className="toast-body" dangerouslySetInnerHTML={{__html: content}}/>
          </div>
        ) }
      </div>
    </div>
  }
}

export default EventToast;
