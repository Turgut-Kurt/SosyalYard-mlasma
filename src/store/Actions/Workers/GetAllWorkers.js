import {axiosInstance as api} from '../../../utils/Api';
import {
  GET_ALL_WORKERS_PENDING,
  GET_ALL_WORKERS_FULFILLED,
  GET_ALL_WORKERS_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetAllWorkers = () => {
  return async (dispatch) => {
    dispatch(fetchingRequest(GET_ALL_WORKERS_PENDING));
    try {
      const response = await api.get('user');
      const payload = await response.data;
      dispatch(fetchingSuccess(GET_ALL_WORKERS_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(GET_ALL_WORKERS_REJECTED, error.response.data));
    }
  };
};
