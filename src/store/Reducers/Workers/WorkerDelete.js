import {
  WORKER_DELETE_PENDING,
  WORKER_DELETE_FULFILLED,
  WORKER_DELETE_REJECTED,
} from '../../Actions/Workers/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};
export default function WorkerDelete(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case WORKER_DELETE_PENDING:
      return {...state, loading: true, data: null, error: null};
    case WORKER_DELETE_FULFILLED:
      return {...state, loading: false, data: payload, error: null};
    case WORKER_DELETE_REJECTED:
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
