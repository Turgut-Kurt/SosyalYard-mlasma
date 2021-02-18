import {axiosInstance as api} from '../../../utils/Api';
import {
  WORKER_IMAGE_ADD_PENDING,
  WORKER_IMAGE_ADD_FULFILLED,
  WORKER_IMAGE_ADD_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const WorkerImageAdd = (id, uri) => {
  return async (dispatch) => {
    dispatch(fetchingRequest(WORKER_IMAGE_ADD_PENDING));
    try {
      const response = await api.post('user/image', {
        id,
        uri,
      });
      const payload = await response.data;
      dispatch(fetchingSuccess(WORKER_IMAGE_ADD_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(WORKER_IMAGE_ADD_REJECTED, error.response.data));
    }
  };
};
