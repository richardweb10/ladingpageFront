import React, { Component } from "react";
import PropTypes, { element } from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
import Loader from "../../tools/loader";
import * as userstActions from "../../actions/users/usersActions";
import ModalResponse from "../layout/Modal/modalResponse";
import { bindActionCreators } from "redux";
import showConsole from "../../tools/logs";

import dateFormat from "dateformat";
import "./login.scss";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { saveAs } from "file-saver";
import config from "../../config";

import * as types from "../../actions";
import logo from "./nasa-logo.png";
import { withRouter } from "react-router-dom";
var jwt = require("jsonwebtoken");
//import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';

let bodyStyle = null;
let action = false;
let eventApprove = true;
let eventView = true;
let existAccountFlag = false;

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nit: "",
      respuesta: "",
    };
  }

  componentDidMount() {}

  showModal() {
    this.setState({ show: !this.state.show });
  }

  signin = (e) => {
    e.preventDefault();
    let username = e.target.txtUser.value;
    let password = e.target.txtPassword.value;
    if (username != "" && password != "") {
      this.props.actions.signin({ username, password });
    } else {
      ModalResponse({
        title: "Inicio de sesión",
        text: "Debe llenar todos los campos",
        res: 404,
      });
    }
  };

  render() {
    let data = null;
    let { isLoading, userToken } = this.props;

    if (userToken && !isLoading) {
      if (userToken.hasOwnProperty("token")) {
        console.log("userToken: ", userToken);
        sessionStorage.setItem("token", userToken.token);
        sessionStorage.setItem("name", userToken.user.name);
        sessionStorage.setItem("componente", userToken.user.componente);
        this.props.history.push(userToken.user.componente);
      } else {
        ModalResponse({
          title: "Inicio de sesión",
          text: "Usuario o contraseña incorrecta ",
          res: 404,
        });
      }
      console.log("userToken: ", userToken);
    }

    return (
      <div id="dvAccountWallet">
        <div class="divTopResponsive img_login">
          <img id="imgLogo" class="imgPrincipal" src={logo} />
        </div>
        <div className="group">
          <div className="login_left">
            <div className="container_login">
              <div>
                <img
                  id="imgLogoResponsive"
                  className="container_login_div"
                  src={logo}
                />
              </div>
            </div>
          </div>

          <div className="login_right">
            <div className="container_login_right">
              <div className="parent_login">
                <div className="child_login">
                  <div className="div_logOn">
                    <form name="ctl06" onSubmit={this.signin} id="ctl06">
                      <table id="tblLogin" border="0">
                        <tr>
                          <td>
                            <h1 className="titleH">Login para aliados</h1>

                            <br />
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <span
                              id="lblSerial"
                              title="Digite el Nit sin digito de verificación"
                              className="label_login font18"
                            >
                              Usuario
                            </span>
                            <input
                              name="txtUser"
                              type="text"
                              maxlength="64"
                              id="txtUser"
                              className="input_text_login"
                            />
                            <br />
                            <span id="rfvtxtSerial" className="spanRes font18">
                              {this.state.respuesta}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span
                              id="lblSerial"
                              title="Digite el Nit sin digito de verificación"
                              className="label_login font18"
                            >
                              Contraseña
                            </span>
                            <input
                              name="txtPassword"
                              type="password"
                              maxlength="64"
                              id="txtPassword"
                              className="input_text_login"
                            />
                            <br />
                            <span id="rfvtxtSerial" className="spanRes font18">
                              {this.state.respuesta}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <br />
                            <input
                              type="submit"
                              name="btnSubmitViewWallet"
                              value="Iniciar sesión"
                              id="btnSubmitViewWallet"
                              className="input_submit_remember"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {isLoading ? (
                              <div>
                                <Loader />
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      </table>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

login.propTypes = {
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userToken: state.users.userToken,
  error: state.users.error,
  isLoading: state.users.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userstActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(login));
