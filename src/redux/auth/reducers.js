/*
** Created on Oct 31, 2018
**
** @author: Ha Do
*/

import { Map } from 'immutable';
import { getToken } from '../../utils/auth';
import actions from './actions';

const initState = new Map({
  idToken: 'secret token',
});

export default function authReducer(
  state = initState.merge(getToken()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return state.set('idToken', action.token).set('error', []);
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
