export default function (api) {
  return {
    signin: (params) => api.post("v1/api/auth/signin", params),
    createCompany: (params) => api.post("v1/api/company/", params),
  };
}
