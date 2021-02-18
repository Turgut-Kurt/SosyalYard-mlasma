import {axiosInstance as api} from '../../../utils/Api';
import {
  WORKER_UPDATE_PENDING,
  WORKER_UPDATE_FULFILLED,
  WORKER_UPDATE_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const WorkerUpdate = (
  id,
  email,
  phoneNumber,
  firstName,
  lastName,
  userName,
  password,
  department,
) => {
  return async (dispatch) => {
    dispatch(fetchingRequest(WORKER_UPDATE_PENDING));
    try {
      const response = await api.put(`user/${id}/`, {
        id,
        email,
        phoneNumber,
        firstName,
        lastName,
        userName,
        password,
        department,
      });
      const payload = await response.data;
      dispatch(fetchingSuccess(WORKER_UPDATE_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(WORKER_UPDATE_REJECTED, error.response.data));
    }
  };
};
