/*
** Created on Nov 01, 2018
**
** @author: Ha Do
*/

import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import { requests } from '../../requests';
import { getToken } from '../../utils/auth';

export function* createGameRequest() {
  yield takeEvery('CREATE_GAME_REQUEST', function*(payload) {
    const idToken =  getToken().get('idToken');
    const result = yield call(requests.post, 'api/game/' + idToken);
    yield put({
        type: actions.CREATE_GAME_SUCCESS,
        game: result,
      });
  });
}

export function* updateGameRequest() {
  yield takeEvery('UPDATE_GAME_REQUEST', function*(payload) {
    const idToken =  getToken().get('idToken');
    const result = yield call(requests.put, 'api/game/' + idToken + '/' + payload.data.id, payload.data);
    yield put({
        type: actions.UPDATE_GAME_SUCCESS,
        game: result,
      });
  });
}

export function* logGameMovesRequest() {
  yield takeEvery('LOG_GAME_MOVES_REQUEST', function*(payload) {
    const idToken =  getToken().get('idToken');
    const result = yield call(requests.post, 'api/game/' + idToken + '/' + payload.data.id + '/moves', payload.data);
    yield put({
        type: actions.LOG_GAME_MOVES_SUCCESS,
        moves: result,
      });
  });
}


export default function* rootSaga() {
  yield all([
    fork(createGameRequest),
    fork(updateGameRequest),
    fork(logGameMovesRequest),
  ]);
}
