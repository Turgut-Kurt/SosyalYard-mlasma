import {
  GET_POST_FILTERS_PENDING,
  GET_POST_FILTERS_FULFILLED,
  GET_POST_FILTERS_REJECTED,
} from '../../Actions/Post/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function GetPostFilters(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_POST_FILTERS_PENDING:
      return {...state, loading: true, data: null, error: null};
    case GET_POST_FILTERS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case GET_POST_FILTERS_REJECTED:
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
