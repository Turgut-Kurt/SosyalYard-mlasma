import {
  LIKE_ADD_PENDING,
  LIKE_ADD_FULFILLED,
  LIKE_ADD_REJECTED,
} from '../../Actions/Like/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};
export default function LikeAdd(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case LIKE_ADD_PENDING:
      return {...state, loading: true, data: null, error: null};
    case LIKE_ADD_FULFILLED:
      return {...state, loading: false, data: payload, error: null};
    case LIKE_ADD_REJECTED:
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
