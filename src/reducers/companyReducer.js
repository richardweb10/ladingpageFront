import * as types from '../actions';
import showConsole from '../tools/logs';

const companyReducer = (state = { isLoading: false }, action = null) => {
  showConsole('action', action);
  showConsole('action.state', action.state);
  showConsole('state', state);
  switch (action.type) {
    case types.CREATE_COMPANY:
      return { ...state, isLoading: true };
    case types.CREATE_COMPANY_RECEIVED:
      return { ...state, isLoading: false, company: action.data };
    case types.CREATE_COMPANY_FAILED:
      return { ...state, isLoading: false, company: action.error };

    default:
      return state;
  }
};

export default companyReducer;
