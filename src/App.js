/*
** Created on Oct 31, 2018
**
** @author: Ha Do
*/
import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import PublicRoutes from './router';

const App = () => (
  <Provider store={store}>
    <PublicRoutes history={history} />
  </Provider>
);

export default App;
