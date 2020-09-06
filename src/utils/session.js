export function checkSession() {
  let token = sessionStorage.getItem('token');
  return token !== '' || token != undefined;
}
