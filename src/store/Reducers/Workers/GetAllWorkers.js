import {
  GET_ALL_WORKERS_PENDING,
  GET_ALL_WORKERS_FULFILLED,
  GET_ALL_WORKERS_REJECTED,
} from '../../Actions/Workers/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function GetAllWorkers(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_ALL_WORKERS_PENDING:
      return {...state, loading: true, data: null, error: null};
    case GET_ALL_WORKERS_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case GET_ALL_WORKERS_REJECTED:
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
