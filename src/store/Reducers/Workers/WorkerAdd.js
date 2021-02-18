import {
  WORKER_ADD_PENDING,
  WORKER_ADD_FULFILLED,
  WORKER_ADD_REJECTED,
} from '../../Actions/Workers/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};
export default function WorkerAdd(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case WORKER_ADD_PENDING:
      return {...state, loading: true, data: null, error: null};
    case WORKER_ADD_FULFILLED:
      return {...state, loading: false, data: payload, error: null};
    case WORKER_ADD_REJECTED:
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
