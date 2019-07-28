import React from 'react';
import ReactDOM from 'react-dom';

function showEventToast(title, body) {
  ReactDOM.render(
    EventToast({title, body}),
    document.getElementById('toasts-root')
  );

  window.jQuery(".toast").toast('show');
}

function EventToast(props) {

  const { title, body } = props;

  return <div className="toasts-container" aria-live="polite" aria-atomic="true">
    <div className="toasts-positioning">
      <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
        <div className="toast-header">
          <strong className="mr-auto">{title}</strong>
          <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">{body}</div>
      </div>
    </div>
  </div>
}

export {EventToast, showEventToast};
