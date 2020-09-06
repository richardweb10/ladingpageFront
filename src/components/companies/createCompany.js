import React, { Component } from "react";
import PropTypes, { element } from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
import Loader from "../../tools/loader";
import * as companyActions from "../../actions/company/companyActions";
import ModalResponse from "../layout/Modal/modalResponse";
import { bindActionCreators } from "redux";
import showConsole from "../../tools/logs";

import dateFormat from "dateformat";
import "./company.scss";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { saveAs } from "file-saver";
import config from "../../config";
import logo from "../users/nasa-logo.png";
import * as types from "../../actions";

//import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';

let bodyStyle = null;
let action = false;
let eventApprove = true;
let eventView = true;
let existAccountFlag = false;

class createCompany extends Component {
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

  generarPassword = () => {
    let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    let password = "";
    for (let i = 0; i < 20; i++) {
      password += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return password;
  };

  onHandleSave = (e) => {
    e.preventDefault();
    if (
      e.target.CompanyName.value != "" &&
      e.target.nit.value != "" &&
      e.target.phone.value != "" &&
      e.target.city.value != "" &&
      e.target.fullName.value != "" &&
      e.target.email.value != "" &&
      e.target.product.value != "-9"
    ) {
      let data = {
        companyFullName: e.target.CompanyName.value,
        nit: e.target.nit.value,
        mobile: e.target.phone.value,
        cityName: e.target.city.value,
        fullName: e.target.fullName.value,
        email: e.target.email.value,
        password: this.generarPassword(),
        productCode: e.target.product.value,
      };
      this.props.actions.createCompany(data);

      console.log("data: ", data);
    } else {
      ModalResponse({
        title: "Crear Empresa",
        text: "Debe ingresar todos los campos",
        res: 404,
      });
    }
  };
  cleardata = () => {
    document.getElementById("CompanyName").value = "";
    document.getElementById("nit").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("city").value = "";
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("product").value = "-9";
  };

  focusInput = (e) => {
    e.preventDefault();
    e.currentTarget.placeholder = "";
    e.currentTarget.classList.add("inputFocus");
    if (e.currentTarget.previousSibling)
      e.currentTarget.previousSibling.classList.add("labelModal");
  };

  blurInput = (e) => {
    e.preventDefault();
    if (e.currentTarget.value == "") {
      e.currentTarget.classList.add("inputError");
      if (e.currentTarget.previousSibling)
        e.currentTarget.previousSibling.classList.add("labelError");
    } else {
      e.currentTarget.classList.add("inputOk");
      if (e.currentTarget.previousSibling)
        e.currentTarget.previousSibling.classList.add("labelOk");
    }
  };

  render() {
    let data = null;
    let { isLoading, company } = this.props;

    if (company && !isLoading) {
      if (company.hasOwnProperty("success")) {
        if (company.success == true) {
          ModalResponse({
            title: "Crear Empresa",
            text: "La empresa se creó correctamente",
            res: 200,
          });
          this.cleardata();
        } else {
          ModalResponse({
            title: "Crear Empresa",
            text:
              "Se presento un error, por favor comunicarse con el administrador",
            res: 404,
          });
        }
      } else {
        ModalResponse({
          title: "Crear Empresa",
          text:
            "Se presento un error, por favor comunicarse con el administrador",
          res: 404,
        });
      }
      console.log("company: ", company);
    }

    return (
      <div>
        <div className="header">
          <img src={logo} width="70" />
        </div>
        <div className="container">
          <form onSubmit={this.onHandleSave}>
            <h1>Datos Empresa</h1>

            <div className="companyDetail">
              <div className="grid2perfil">
                <div className="input-container1 input-container2">
                  <label>Nombre empresa</label>
                  <input type="text" name="CompanyName" id="CompanyName" />
                </div>
                <div className="input-container1">
                  <label>Nit</label>
                  <input
                    type="number"
                    pattern="/^[0-9]+$/"
                    name="nit"
                    id="nit"
                  />
                </div>
              </div>
              <div className="grid2perfil">
                <div className="input-container1 input-container2">
                  <label>Nombre administrador</label>
                  <input type="text" name="fullName" id="fullName" />
                </div>
                <div className="input-container1">
                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                </div>
              </div>
              <div className="grid2perfil">
                <div className="input-container1 input-container2">
                  <label>Ciudad</label>
                  <input type="text" name="city" id="city" />
                </div>
                <div className="input-container1">
                  <label>Celular</label>
                  <input
                    type="number"
                    pattern="/^[0-9]+$/"
                    name="phone"
                    id="phone"
                  />
                </div>
              </div>
              <div className="grid2perfil">
                <div className="input-container1 input-container2">
                  <label>Licencia</label>
                  <select name="product" id="product">
                    <option value="-9">Seleccionar producto</option>
                    <option value="1">ATMOSPHERE</option>
                    <option value="2">ENERGY</option>
                    <option value="3">LAND</option>
                    <option value="4">LIFE</option>
                    <option value="5">OCEAN</option>
                  </select>
                </div>
              </div>

              <div className="grid1perfil">
                <button
                  className="blue-fill marketModifyButton"
                  type="submit"
                  style={{ width: 150, margin: "0 auto", marginTop: 30 }}
                >
                  Guardar
                </button>
                {isLoading ? (
                  <div>
                    <Loader />
                  </div>
                ) : null}
              </div>
            </div>
          </form>
        </div>
        <div className="footer">
          <h3>NASA Headquarters</h3>

          <div>
            {" "}
            <span>
              {" "}
              <i className="fa fa-phone"></i>(202) 358-0001 (Office)
            </span>{" "}
            <span>
              {" "}
              <i className="fa fa-envelope"></i>request@newsletters.nasa.gov
            </span>{" "}
            <span>
              <i className="fa fa-map-marker"></i>300 E. Street SW, Suite 5R30
            </span>
          </div>
          <p>Washington, DC 20546</p>
        </div>
      </div>
    );
  }
}

createCompany.propTypes = {
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  company: state.companies.company,
  error: state.companies.error,
  isLoading: state.companies.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(companyActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(createCompany);
