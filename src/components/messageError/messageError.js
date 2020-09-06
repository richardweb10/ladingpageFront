import React, { Component } from 'react';
import './messageError.scss';
import showConsole from '../../tools/logs';

class MessageError extends Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    showConsole(error, errorInfo);
  }

  render() {
    let { messageError, quoteInfo } = this.props;
    if (this.state.hasError) {
      return (
        <div className="htmlSumaryNotFound">
          <i className="siicon icon-info"></i>
          <p className="textInfo">{messageError}</p>
          <p className="font20">{quoteInfo}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
export default MessageError;
