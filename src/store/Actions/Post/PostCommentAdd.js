import {axiosInstance as api} from '../../../utils/Api';
import {
  POST_COMMENT_ADD_PENDING,
  POST_COMMENT_ADD_FULFILLED,
  POST_COMMENT_ADD_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';
export const PostCommentAdd = (userId, postId, message) => {
  return async (dispatch) => {
    dispatch(fetchingRequest(POST_COMMENT_ADD_PENDING));
    try {
      const response = await api.post('comment', {
        userId,
        postId,
        message,
      });
      const payload = await response.data;
      dispatch(fetchingSuccess(POST_COMMENT_ADD_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(POST_COMMENT_ADD_REJECTED, error.response.data));
    }
  };
};
