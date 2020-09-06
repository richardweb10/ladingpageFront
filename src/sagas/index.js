import { takeLatest, all, take, call, actionChannel } from 'redux-saga/effects';

/* ----------------- Types ----------------- */

import * as types from '../actions';

/* ----------------- Sagas ----------------- */

import { signin } from './usersSaga';

import { createCompany } from './companySaga';

/* ----------------- API ----------------- */

function* usersActionWatcher() {
  yield takeLatest(types.SIGNIN_USER, signin);
}

function* companyActionWatcher() {
  yield takeLatest(types.CREATE_COMPANY, createCompany);
}

export default function* root() {
  yield all([usersActionWatcher(), companyActionWatcher()]);
}
