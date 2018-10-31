/*
** Created on Oct 31, 2018
**
** @author: Ha Do
*/

const authActons = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  login: (credentials) => ({
    type: authActons.LOGIN_REQUEST,
    credentials: credentials
  }),
  logout: () => ({
    type: authActons.LOGOUT,
  }),
};
export default authActons;
