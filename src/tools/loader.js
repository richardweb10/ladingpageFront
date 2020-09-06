import React, { Component } from 'react';
import './loader.scss';

let loadSend = React.createRef();
class Loader extends Component {
  render() {
    let refLoad = '';
    if (this.props.loadSend) refLoad = this.props.loadSend;
    return (
      <div className="loader">
        <div className={'lds-ring ' + refLoad}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Loader;
