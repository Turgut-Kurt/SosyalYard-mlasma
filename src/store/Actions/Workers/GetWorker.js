import {axiosInstance as api} from '../../../utils/Api';
import {
  GET_WORKER_PENDING,
  GET_WORKER_FULFILLED,
  GET_WORKER_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetWorker = (id) => {
  return async (dispatch) => {
    dispatch(fetchingRequest(GET_WORKER_PENDING));
    try {
      const response = await api.get(`user/${id}`);
      const payload = await response.data;
      dispatch(fetchingSuccess(GET_WORKER_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(GET_WORKER_REJECTED, error.response.data));
    }
  };
};
