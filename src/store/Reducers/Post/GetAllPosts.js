import {
  GET_ALL_POSTS_PENDING,
  GET_ALL_POSTS_FULFILLED,
  GET_ALL_POSTS_REJECTED,
} from '../../Actions/Post/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function GetAllPosts(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_ALL_POSTS_PENDING:
      return {...state, loading: true, data: null, error: null};
    case GET_ALL_POSTS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case GET_ALL_POSTS_REJECTED:
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
