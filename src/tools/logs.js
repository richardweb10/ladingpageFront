const debug = process.env.REACT_APP_DEBUG;
const showConsole = function () {
  if (debug == 'QA') console.log(...arguments);
};
export default showConsole;
