import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Login from "../containers/users/login";
import CompanyContainer from "../containers/companies/createCompany";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Login} exact />
            <PrivateRoute path="/company" component={CompanyContainer} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
