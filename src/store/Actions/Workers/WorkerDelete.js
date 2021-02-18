import {axiosInstance as api} from '../../../utils/Api';
import {
  WORKER_DELETE_PENDING,
  WORKER_DELETE_FULFILLED,
  WORKER_DELETE_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const WorkerDelete = (id) => {
  return async (dispatch) => {
    dispatch(fetchingRequest(WORKER_DELETE_PENDING));
    try {
      const response = await api.delete(`user/${id}/`, {
        id,
      });
      const payload = await response.data;
      dispatch(fetchingSuccess(WORKER_DELETE_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(WORKER_DELETE_REJECTED, error.response.data));
    }
  };
};
