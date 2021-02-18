import {axiosInstance as api} from '../../../utils/Api';
import {LIKE_ADD_PENDING, LIKE_ADD_FULFILLED, LIKE_ADD_REJECTED} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const LikeAdd = (userId, postId, count) => {
  return async (dispatch) => {
    dispatch(fetchingRequest(LIKE_ADD_PENDING));
    try {
      const response = await api.post('like', {
        userId,
        postId,
        count,
      });
      const payload = await response.data;
      dispatch(fetchingSuccess(LIKE_ADD_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(LIKE_ADD_REJECTED, error.response.data));
    }
  };
};
