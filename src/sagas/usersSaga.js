import { put, call } from 'redux-saga/effects';
import * as types from '../actions';
import API from '../services/api/index';
import showConsole from '../tools/logs';
const api = API.create();

export function* signin(action) {
  try {

    const { params } = action;
    showConsole('signin api api api--------->', api);
    showConsole('params: ', action);

    showConsole(params);

    let user = yield call(
      api.landingPage.signin,
      params
    );
    console.log("user-sagas: ", user)
    showConsole('user ---------->', user);

    if (user.status != 200) {
      const error = user.data;
      yield put({ type: types.SIGNIN_USER_FAILED, error });
    } else {
      yield put({
        type: types.SIGNIN_USER_RECEIVED,
        data: user.data,
      });
    }
  } catch (error) {
    yield put({ type: types.SIGNIN_USER_FAILED, error });
  }
}

