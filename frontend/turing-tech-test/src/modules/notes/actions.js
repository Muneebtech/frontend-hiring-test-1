import { REQUEST, SUCCESS, FAILURE, createRequestTypes, action } from '../common/actions';

export const RESET_FORM_DETAILS = 'Users/RESET_FORM_DETAILS';
export const GET_USERS = createRequestTypes('Users/GET_USERS');
export const GET_USER = createRequestTypes('Users/GET_USER');


const usersActions = {
  resetFormDetails: () => action(RESET_FORM_DETAILS),

  getUsers: {
    request: data => action(GET_USERS[REQUEST], { payload: data }),
    success: data => action(GET_USERS[SUCCESS], { payload: data }),
    failure: error => action(GET_USERS[FAILURE], { payload: error }),
  },

  getUser: {
    request: data => action(GET_USER[REQUEST], { payload: data }),
    success: data => action(GET_USER[SUCCESS], { payload: data }),
    failure: error => action(GET_USER[FAILURE], { payload: error }),
  }
};

export default usersActions;
