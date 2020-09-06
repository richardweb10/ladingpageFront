import React from 'react';
import './index.scss';
const Footer = () => {
  return (
    <div className="footer">
      <h3>Siigo S.A.S.</h3>
        <div>
        {' '}
        <span>
          <i className="siicon icon-phone"></i>(571) 633 7150
        </span>{' '}
        <span>
          {' '}
          <i className="siicon icon-email"></i>comercial@siigo.com
        </span>{' '}
        <span>
          <i className="siicon icon-Location"></i>Cr. 18 No. 79 A - 42
        </span>
      </div>
      <p>Bogotá, Colombia</p>
    </div>
  );
};

export default Footer;
