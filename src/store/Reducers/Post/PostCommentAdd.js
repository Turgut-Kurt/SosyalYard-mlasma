import {
  POST_COMMENT_ADD_PENDING,
  POST_COMMENT_ADD_FULFILLED,
  POST_COMMENT_ADD_REJECTED,
} from '../../Actions/Post/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};
export default function PostCommentAdd(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case POST_COMMENT_ADD_PENDING:
      return {...state, loading: true, data: null, error: null};
    case POST_COMMENT_ADD_FULFILLED:
      return {...state, loading: false, data: payload, error: null};
    case POST_COMMENT_ADD_REJECTED:
      return {
        ...state,
        loading: false,
        data: null,
        error: payload,
      };
    default:
      return state;
  }
}
