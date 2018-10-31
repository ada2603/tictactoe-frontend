/*
** Created on Oct 31, 2018
**
** @author: Ha Do
*/

import { Map } from 'immutable';
import cookie from 'react-cookies'

export function getToken() {
  try {
    const idToken = (cookie.load('id_token')) ? cookie.load('id_token') : localStorage.getItem('id_token');
    return new Map({ idToken });
  } catch (err) {
    clearToken();
    return new Map();
  }
}

export function clearToken() {
  localStorage.removeItem('id_token');
  cookie.remove('id_token', { path: '/' });
}
