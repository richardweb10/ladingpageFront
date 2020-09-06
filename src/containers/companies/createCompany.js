import React, { Component } from "react";
import Company from "../../components/companies/createCompany";
import showConsole from "../../tools/logs";

class CompanyContainer extends Component {
  render() {
    return (
      <div>
        <Company />
      </div>
    );
  }
}

export default CompanyContainer;
