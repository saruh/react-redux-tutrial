import * as ActionTypes from '../constants/ActionTypes';

export function recieveComments(comments) {
  return {
    type: ActionTypes.RECEIVE_COMMENTS,
    comments
  };
}

export function addComment(comment) {
  return {
    type: ActionTypes.ADD_COMMENT,
    comment
  };
}

export function searchComments() {
  return {
    type: ActionTypes.SEARCH_COMMENT
  };
}
