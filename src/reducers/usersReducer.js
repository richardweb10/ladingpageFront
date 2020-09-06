import * as types from '../actions';
import showConsole from '../tools/logs';

const usersReducer = (
  state = { isLoading: false },
  action = null
) => {
  showConsole('action', action);
  showConsole('action.state', action.state);
  showConsole('state', state);
  switch (action.type) {
    case types.SIGNIN_USER:
      return { ...state, isLoading: true };
    case types.SIGNIN_USER_RECEIVED:
      return { ...state, isLoading: false, userToken: action.data };
    case types.SIGNIN_USER_FAILED:
      return { ...state, isLoading: false, userToken: action.error };

    default:
      return state;
  }
};

export default usersReducer;
