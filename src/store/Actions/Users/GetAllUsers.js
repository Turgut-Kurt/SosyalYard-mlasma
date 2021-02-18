import axios from 'axios';
import {
  GET_ALL_USERS_PENDING,
  GET_ALL_USERS_FULFILLED,
  GET_ALL_USERS_REJECTED,
} from './types';
import {fetchingRequest, fetchingSuccess, fetchingFailure} from '../index';

export const GetAllUsers = (page) => {
  return async (dispatch) => {
    dispatch(fetchingRequest(GET_ALL_USERS_PENDING));
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?results=30&page=${page}`,
      );
      const payload = await response.data.results;
      dispatch(fetchingSuccess(GET_ALL_USERS_FULFILLED, payload));
    } catch (error) {
      dispatch(
        fetchingFailure(GET_ALL_USERS_REJECTED, error.response.data.results),
      );
    }
  };
};
