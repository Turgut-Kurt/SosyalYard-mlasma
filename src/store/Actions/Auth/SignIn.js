import {axiosInstance as api} from '../../../utils/Api';
import {SIGN_IN_PENDING, SIGN_IN_FULFILLED, SIGN_IN_REJECTED} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';
import jwtDecode from 'jwt-decode';

export const SignIn = (username, password) => {
  return async (dispatch) => {
    dispatch(fetchingRequest(SIGN_IN_PENDING));
    try {
      const response = await api.post('account/login', {username, password});
      const payload = await response.data;
      const tokenDecoded = await jwtDecode(payload.token);
      const newPayload = await {
        ...payload,
        role:
          tokenDecoded[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ],
        userId:
          tokenDecoded[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ],
      };
      console.log(newPayload);
      dispatch(fetchingSuccess(SIGN_IN_FULFILLED, newPayload));
    } catch (error) {
      dispatch(fetchingFailure(SIGN_IN_REJECTED, error.response.data));
    }
  };
};
