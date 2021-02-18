import {axiosInstance as api} from '../../../utils/Api';
import {
  GET_ALL_POSTS_PENDING,
  GET_ALL_POSTS_FULFILLED,
  GET_ALL_POSTS_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetAllPosts = () => {
  return async (dispatch) => {
    dispatch(fetchingRequest(GET_ALL_POSTS_PENDING));
    try {
      const response = await api.get('post');
      const payload = await response.data;
      dispatch(fetchingSuccess(GET_ALL_POSTS_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(GET_ALL_POSTS_REJECTED, error.response.data));
    }
  };
};
