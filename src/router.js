import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import Game from './containers/Game';
import asyncComponent from './utils/AsyncFunc';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      isLoggedIn
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/game',
              state: { from: props.location }
            }}
          />}
  />;
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/'}
          component={asyncComponent(() => import('./containers/Main'))}
        />
        <Route
          exact
          path={'/404'}
          component={asyncComponent(() => import('./containers/NotFound'))}
        />
        <RestrictedRoute
          path="/game"
          component={Game}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  );
};

export default connect(state => ({
  isLoggedIn: state.Auth.get('idToken') !== null
}))(PublicRoutes);
