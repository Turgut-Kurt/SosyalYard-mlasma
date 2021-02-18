import {axiosInstance as api} from '../../../utils/Api';
import {
  WORKER_ADD_PENDING,
  WORKER_ADD_FULFILLED,
  WORKER_ADD_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const WorkerAdd = (
  email,
  phoneNumber,
  firstName,
  lastName,
  userName,
  password,
  department,
) => {
  return async (dispatch) => {
    dispatch(fetchingRequest(WORKER_ADD_PENDING));
    try {
      const response = await api.post('user/', {
        email,
        phoneNumber,
        firstName,
        lastName,
        userName,
        password,
        department,
      });
      const payload = await response.data;
      dispatch(fetchingSuccess(WORKER_ADD_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(WORKER_ADD_REJECTED, error.response.data));
    }
  };
};
