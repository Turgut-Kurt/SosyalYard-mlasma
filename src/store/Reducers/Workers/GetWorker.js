import {
  GET_WORKER_PENDING,
  GET_WORKER_FULFILLED,
  GET_WORKER_REJECTED,
} from '../../Actions/Workers/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function GetWorker(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_WORKER_PENDING:
      return {...state, loading: true, data: null, error: null};
    case GET_WORKER_FULFILLED:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case GET_WORKER_REJECTED:
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
