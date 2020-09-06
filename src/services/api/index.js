// a library to wrap and simplify api calls
import apisauce from "apisauce";
import LandingPage from "./services/landingPage";
import config from "../../config.js";
import showConsole from "../../tools/logs";

const create = (baseURL = config.url) => {
  showConsole("baseURL", baseURL);
  const api = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache",
      "content-type": "multipart/form-data",
      "content-type": "application/json",
      //Authorization: "bearer " + getCookie("token")
    },
    // 10 second timeout...
    timeout: 1000000,
  });

  const landingPage = new LandingPage(api);

  //  return Api
  return {
    setHeader: (key, value) => api.setHeader(key, value),
    removeHeader: (key) => api.deleteHeader(key),
    landingPage,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
