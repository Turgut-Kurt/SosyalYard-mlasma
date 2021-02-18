import {axiosInstance as api} from '../../../utils/Api';
import {POST_ADD_PENDING, POST_ADD_FULFILLED, POST_ADD_REJECTED} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';
export const PostAdd = (
  userId,
  description,
  imageUrl,
  category,
  province,
  district,
) => {
  return async (dispatch) => {
    dispatch(fetchingRequest(POST_ADD_PENDING));
    try {
      const response = await api.post('post', {
        userId,
        description,
        imageUrl,
        category,
        province,
        district,
      });
      const payload = await response.data;
      dispatch(fetchingSuccess(POST_ADD_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(POST_ADD_REJECTED, error.response.data));
    }
  };
};
