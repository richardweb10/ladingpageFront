import React, { Component } from 'react';
import Login from '../../components/users/login';
import showConsole from '../../tools/logs';

class LoginContainer extends Component {
  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default LoginContainer;
