import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import gameSagas from './game/sagas';
export default function* rootSaga(getState) {
  yield all([
    authSagas(), 
    gameSagas()
  ]);
}
