import { put, call } from "redux-saga/effects";
import * as types from "../actions";
import API from "../services/api/index";
import showConsole from "../tools/logs";
import dJSON from "dirty-json";
import convert from "xml-js";

export function* createCompany(action) {
  try {
    const api = API.create();

    api.setHeader("authorization", sessionStorage.getItem("token"));
    const { params } = action;
    showConsole("createCompany api api api--------->", api);
    showConsole("params: ", action);

    showConsole(params);

    let company = yield call(api.landingPage.createCompany, params);
    console.log("company-sagas: ", company);
    showConsole("company ---------->", company);

    if (company.status != 201) {
      const error = { success: false, status: company.status };
      yield put({ type: types.CREATE_COMPANY_FAILED, error });
    } else {
      yield put({
        type: types.CREATE_COMPANY_RECEIVED,
        data: { success: true, status: company.status, company: company.data },
      });
    }
  } catch (error) {
    yield put({ type: types.CREATE_COMPANY_FAILED, error });
  }
}

function getJsonFromXML(data) {
  let xml = JSON.parse(
    convert.xml2json(data, {
      compact: true,
      spaces: 4,
    })
  );
  let xmlData = "";
  if (data.indexOf("SupplyTenantCloudLicenseResponse") != -1) {
    xmlData = JSON.parse(
      JSON.stringify(
        dJSON.parse(
          xml["soap:Envelope"]["soap:Body"].SupplyTenantCloudLicenseResponse
            .SupplyTenantCloudLicenseResult._text
        )
      )
    );
  } else {
    xmlData = JSON.parse(
      JSON.stringify(
        dJSON.parse(
          xml["soap:Envelope"]["soap:Body"].CreateCompanyWithSourceResponse
            .CreateCompanyWithSourceResult._text
        )
      )
    );
  }
  return xmlData;
}
