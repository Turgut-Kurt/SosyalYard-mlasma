import {axiosInstance as api} from '../../../utils/Api';
import {SIGN_UP_PENDING, SIGN_UP_FULFILLED, SIGN_UP_REJECTED} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const SignUp = (values) => {
  return async (dispatch) => {
    dispatch(fetchingRequest(SIGN_UP_PENDING));
    try {
      const response = await api.post('register', values);
      const payload = await response.data;
      dispatch(fetchingSuccess(SIGN_UP_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(SIGN_UP_REJECTED, error.response.data));
    }
  };
};
