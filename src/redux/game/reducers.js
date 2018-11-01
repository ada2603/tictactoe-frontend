/*
** Created on Nov 01, 2018
**
** @author: Ha Do
*/

import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({
  game: null,
  error: [],
  moves: null
});

export default function gameReducer(state = initState, action) {
  switch (action.type) {
    case actions.CREATE_GAME_REQUEST:
    case actions.UPDATE_GAME_REQUEST:
    case actions.LOG_GAME_MOVE_REQUEST:
      return state.set('error', []);
    case actions.CREATE_GAME_SUCCESS:
    case actions.UPDATE_GAME_SUCCESS:
      return state.set("game", action.game).set('error', []);
    case actions.LOG_GAME_MOVES_SUCCESS:
      return state.set("moves", action.moves).set('error', []);
    default:
      return state;
    }
}