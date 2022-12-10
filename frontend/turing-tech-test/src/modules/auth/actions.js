import { REQUEST, SUCCESS, FAILURE, createRequestTypes, action } from '../common/actions';

export const SIGNUP = createRequestTypes('SIGNUP');
export const SIGNIN = createRequestTypes('SIGNIN');
export const CONFIRM_SIGNIN = createRequestTypes('CONFIRM_SIGNIN');
export const SIGNOUT = createRequestTypes('SIGNOUT');


const authActions = {
  signup: {
    request: data => action(SIGNUP[REQUEST], { payload: data }),
    success: data => {
      return action(SIGNUP[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(SIGNUP[FAILURE], { payload: error });
    },
  },

  signin: {
    request: data => action(SIGNIN[REQUEST], { payload: data }),
    success: data => {
      return action(SIGNIN[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(SIGNIN[FAILURE], { payload: error });
    }
  },

  signout: {
    request: data => {
      return action(SIGNOUT[REQUEST], { payload: data });
    },
    success: data => {
      return action(SIGNOUT[SUCCESS], { payload: data });
    },
    failure: error => {
      return action(SIGNOUT[FAILURE], { payload: error });
    },
  },

};

export default authActions;
