/*
** Created on Oct 31, 2018
**
** @author: Ha Do
*/

import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearToken } from '../../utils/auth';
import actions from './actions';
import history from '../../utils/history';

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*(payload) {
    yield put({
        type: actions.LOGIN_SUCCESS,
        token: '_' + Math.random().toString(36).substr(2, 9),
      });
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('id_token', payload.token);
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearToken();
    history.replace('/');
    yield put(push('/'));
  });
}
export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    fork(logout),
  ]);
}
