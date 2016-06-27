import * as actions from './actions/CommentActions';
import * as ActionTypes from './constants/ActionTypes';
import io from 'socket.io-client';

let socket = null;

export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);

    if (socket && action.type === ActionTypes.ADD_COMMENT) {
      console.log('[chat.js][middleware][ADD_COMMENT]', action.comment);
      socket.emit('create comment', action.comment);
    }

    if (socket && action.type === ActionTypes.SEARCH_COMMENT) {
      console.log('[chat.js][middleware][SEARCH_COMMENT]');
      socket.emit('search comments');
    }

    return result;
  };
}

export default function (store) {
  socket = io.connect(`${location.protocol}//${location.host}`);

  socket.on('recieve comments', comments => {
    console.log('[chat.js][socket.id]', socket.id);
    store.dispatch(actions.recieveComments(comments));
  });

}