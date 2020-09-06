import React from 'react';
import Swal from 'sweetalert2';

const ModalResponse = ({ title, text, res }) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'button green',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  let response = '';
  // let text = '';
  switch (res) {
    case 200:
      response = 'success';
      break;
    case 202:
      response = 'warning'
      break;
    default:
      response = 'error';
      break;
  }
  swalWithBootstrapButtons.fire(title, text, response);

  return <div></div>;
};

export default ModalResponse;
