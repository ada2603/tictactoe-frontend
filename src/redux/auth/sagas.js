/*
** Created on Oct 31, 2018
**
** @author: Ha Do
*/

import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearToken } from '../../utils/auth';
import actions from './actions';
import history from '../../utils/history';
import { requests } from '../../requests';

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*(payload) {
    const idToken =  '_' + Math.random().toString(36).substr(2, 9);
    const result = yield call(requests.post, 'api/player/' + idToken);
    console.log(result);
    yield put({
        type: actions.LOGIN_SUCCESS,
        token: idToken,
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
