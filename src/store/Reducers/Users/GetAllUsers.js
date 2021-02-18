import {
  GET_ALL_USERS_PENDING,
  GET_ALL_USERS_FULFILLED,
  GET_ALL_USERS_REJECTED,
} from '../../Actions/Users/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function GetAllUsers(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_ALL_USERS_PENDING:
      return {...state, loading: true, data: null, error: null};
    case GET_ALL_USERS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case GET_ALL_USERS_REJECTED:
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
