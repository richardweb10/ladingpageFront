import React from 'react';
import './modal.css';
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  send = e => {
    this.props.onSubmit && this.props.onSubmit(e);
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
            <div class="content">{this.props.children}</div>
            <div class="actions">
              <button className="red btnCancelarModal" onClick={this.onClose}>
                Cancelar
              </button>
              <button type="submit" className="green-fill btnPagarModal">
                Pagar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};
