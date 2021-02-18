import {
  WORKER_UPDATE_PENDING,
  WORKER_UPDATE_FULFILLED,
  WORKER_UPDATE_REJECTED,
} from '../../Actions/Workers/types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};
export default function WorkerUpdate(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case WORKER_UPDATE_PENDING:
      return {...state, loading: true, data: null, error: null};
    case WORKER_UPDATE_FULFILLED:
      return {...state, loading: false, data: payload, error: null};
    case WORKER_UPDATE_REJECTED:
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
