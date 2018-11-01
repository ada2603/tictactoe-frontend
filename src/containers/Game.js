/*
** Created on Oct 31, 2018
**
** @author: Ha Do
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

import gameAction from '../redux/game/actions';
import '../static/App.css';

const { newgame, updategame, logmoves } = gameAction;

const initialState = {
    player_1_moves: [],
    player_2_moves: [],
    board: [
      ['cells cell-0', 'cells cell-1', 'cells cell-2'],
      ['cells cell-3', 'cells cell-4', 'cells cell-5'],
      ['cells cell-6', 'cells cell-7', 'cells cell-8']
    ],
    isMyTurn: true,
    possibleMoves: {"0": 3, "1": 2, "2": 3, "3": 2, "4": 4, "5": 2, "6": 3, "7": 2, "8": 3},
    winningMoves: ["012", "036", "048", "147", "258", "246", "345", "678"],
    eliminateMoves: [],
};

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = _.cloneDeep(initialState);
  }
  reset = () => {
    const state = _.cloneDeep(initialState)
    this.setState(state);
    this.props.newgame();
  }
  newMove = (x, y, c) => {
    const isMyTurn = this.state.isMyTurn;
    const possibleMoves = this.state.possibleMoves;
    const moveIndex = _.indexOf(Object.keys(possibleMoves), c.toString());

    if (isMyTurn && moveIndex > -1 ) {
      this.props.logmoves({
        id: this.props.Game.game.id,
        move: c.toString(),
        player_1: this.props.Game.game.player_1
      });

      delete possibleMoves[c];
      
      let eliminateMoves = this.state.eliminateMoves;
      eliminateMoves.push(c.toString());

      const moves = this.state.player_1_moves;
      const board = this.state.board;
      board[x][y] = board[x][y] + " circle";
      moves.push(c.toString());
      this.setState({
        player_1_moves: moves,
        board,
        isMyTurn: false,
        possibleMoves,
        eliminateMoves
      });
      if (moves.length > 2 && this.isWin(moves, true)) {
        alert("You Win!");
        this.props.updategame({
          id: this.props.Game.game.id,
          status: 1,
          player_1_status: 1
        });
      } else {
        this.nextMove(c);
      }
    }
  }
  nextMove = (counter) => {
    let eliminateMoves = this.state.eliminateMoves;
    const { possibleMoves, winningMoves } = this.state;
    let predictMoves = [];
    _.some(winningMoves, function(str){
      if (_.includes(str, counter)){
        predictMoves = predictMoves.concat(str.split(""));
      }
    })
    
    predictMoves = _.difference(_.uniq(predictMoves), eliminateMoves);

    var maxNum = 0;
    var nextMove = 0;
    _.forEach(possibleMoves, function(value, key) {
      if(_.indexOf(predictMoves, key) > -1 && value > maxNum) {
        maxNum = value;
        nextMove = key;
      }
    });
    delete possibleMoves[nextMove];
      
    const moves = this.state.player_2_moves;
    const board = this.state.board;
    const el = window.document.getElementsByClassName(`cells cell-${nextMove}`).item(0);
    const x = el.dataset.x;
    const y = el.dataset.y;
    board[x][y] = board[x][y] + " cross";
    moves.push(nextMove.toString());
    this.setState({
      player_2_moves: moves,
      board,
      possibleMoves,
    });
    this.props.logmoves({
      id: this.props.Game.game.id,
      move: nextMove.toString(),
      player_2: 0
    });
    if (moves.length > 2 && this.isWin(moves, false)) {
        alert("You Lose!");
        this.props.updategame({
          id: this.props.Game.game.id,
          status: 1,
          player_1_status: 2
        });
    } else {
      this.setState({
          isMyTurn: true,
      });
    }
  }

  isWin = (eliminateMoves, isMe) => {
    let status = false;
    _.some(this.state.winningMoves, function(str){
      let checkWin = _.difference(str.split(""), eliminateMoves);
      if (checkWin.length === 0) {
        return status = true;
      }
    })
    return status;
  }

  componentWillMount() {
    const { isLoggedIn, newgame } = this.props
    if (isLoggedIn) {
      newgame();
    }
  }

  render() {
    const that = this;
    const to = { pathname: '/' };
    if (!this.props.isLoggedIn) {
      return <Redirect to={to} />;
    }
    return (
      <div className="app">
        <header className="header">
          <p>
            Tic Tac Toe
          </p>
        </header>
        <div className="board">
          {that.state.board.map(function(name, index) {
            var i = index*3;
            return (<div className="rows" key={index}>
                {that.state.board[index].map(function(value, key) {
                  var j = key + i;
                  return <div className={that.state.board[index][key]} data-x={index} data-y={key} onClick={(e) => that.newMove(index, key, j)} key={key}></div>;
                })}
              </div>);
          })}
        </div>
        <div className="main">
          <button onClick={this.reset}>Reset game</button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
    Game: state.Game.toJS(),
    Auth: state.Auth.toJS(),
  }),
  { newgame, updategame, logmoves }
)(Game);

