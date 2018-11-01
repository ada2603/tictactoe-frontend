/*
** Created on Nov 01, 2018
**
** @author: Ha Do
*/

const gameActions = {
  CREATE_GAME_REQUEST: 'CREATE_GAME_REQUEST',
  CREATE_GAME_SUCCESS: 'CREATE_GAME_SUCCESS',
  UPDATE_GAME_REQUEST: 'UPDATE_GAME_REQUEST',
  UPDATE_GAME_SUCCESS: 'UPDATE_GAME_SUCCESS',
  LOG_GAME_MOVES_REQUEST: 'LOG_GAME_MOVES_REQUEST',
  LOG_GAME_MOVES_SUCCESS: 'LOG_GAME_MOVES_SUCCESS',
  newgame: (credentials) => ({
    type: gameActions.CREATE_GAME_REQUEST
  }),
  updategame: (data) => ({
    type: gameActions.UPDATE_GAME_REQUEST,
    data
  }),
  logmoves: (data) => ({
    type: gameActions.LOG_GAME_MOVES_REQUEST,
    data
  }),
};
export default gameActions;
