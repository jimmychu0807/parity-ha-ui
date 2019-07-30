import React from 'react';

import { CopyToClipboard as CTC } from 'react-copy-to-clipboard';

class CopyToClipboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showCopyBtn: false};
  }

  showCopyBtn = (ev) => this.setState({showCopyBtn: true});
  hideCopyBtn = (ev) => this.setState({showCopyBtn: false});

  render() {
    const { value } = this.props;
    const { showCopyBtn } = this.state;
    const btnClass = `p-0 btn btn-link ${showCopyBtn ? "visible" : "invisible"}`;

    return <div className="d-inline-block"
      onMouseEnter={this.showCopyBtn}
      onMouseLeave={this.hideCopyBtn}>
      <span>{value}</span>
      <CTC text={value}>
        <button type="button" className={btnClass}>
          <i className="far fa-copy fa-fw"/>
        </button>
      </CTC>
    </div>
  }
}

export default CopyToClipboard;
