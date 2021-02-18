import {axiosInstance as api} from '../../../utils/Api';
import {
  GET_POST_FILTERS_PENDING,
  GET_POST_FILTERS_FULFILLED,
  GET_POST_FILTERS_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetPostFilters = (province, category) => {
  return async (dispatch) => {
    dispatch(fetchingRequest(GET_POST_FILTERS_PENDING));
    try {
      const response = await api.get(
        `post/filter?Category=${category}&Province=${province}&District=0&Page=1&PageSize=100`,
      );
      const payload = await response.data;
      dispatch(fetchingSuccess(GET_POST_FILTERS_FULFILLED, payload));
    } catch (error) {
      dispatch(fetchingFailure(GET_POST_FILTERS_REJECTED, error.response.data));
    }
  };
};
