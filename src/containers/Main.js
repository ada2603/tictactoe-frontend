/*
** Created on Oct 31, 2018
**
** @author: Ha Do
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

import authAction from '../redux/auth/actions';
import '../static/App.css';

const { login, logout } = authAction;

class Main extends Component {

  handleLogin = () => {
    const { login } = this.props;
    login();
  };
  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };

  newGame = ( multiplayer ) => {
    const { isLoggedIn, login } = this.props
    if (!isLoggedIn) {
      login();
    }
    this.props.history.push('/game');
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>
            Tic Tac Toe
          </h1>
        </header>
        <div className="main">
          <h2>New Game</h2>
          {/*<button type="primary" onClick={() => this.newGame(true)}>Multiple Player</button>*/}
          <button onClick={() => this.newGame(false)}>With Computer</button>
          {/*<h2>Resume Game</h2>
          <button type="primary">Continue</button>
          <button onClick={this.handleLogout}>Reset game</button>*/}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
    Auth: state.Auth.toJS()
  }),
  { login, logout }
)(Main);
