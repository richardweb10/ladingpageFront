import React from 'react';
import './modal.css';
import PropTypes from 'prop-types';
import Loader from '../../../tools/loader';

export default class ModalLoader extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal-parent">
        <div class="modal" id="modal">
          <div className="h2">
            <span>{this.props.title}</span>{' '}
            <i
              onClick={this.onClose}
              className=" siicon icon-close closeModal"
            ></i>
          </div>
          <form onSubmit={this.send}>
            <Loader />
            <div class="content">{this.props.children}</div>
          </form>
        </div>
      </div>
    );
  }
}
