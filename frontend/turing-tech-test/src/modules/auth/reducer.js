import {
  SIGNIN,
  SIGNOUT
} from './actions';
import { getUserId, getUser } from '../common/utils';

const initialState = {
  isLoggedIn: !!getUserId(),
  user: getUser(),
  loading: false,
  error: false
};

function authReducer(state = initialState, { type, payload }) {
  switch (type) {

    case SIGNIN.REQUEST:
      return {
        ...state,
        username: payload,
        loading: true,
        error: false,
        isLoggedIn: false,
      };

    case SIGNIN.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: payload.user,
        isLoggedIn: true,
        mfaFormType: '',
        loginVisible: false,
      };

    case SIGNIN.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
        isLoggedIn: false,
        user: payload.user
      };

    case SIGNOUT.REQUEST:
      return { ...state, loading: true, error: false };

    case SIGNOUT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isLoggedIn: false,
      };

    case SIGNOUT.FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: payload.message,
      };

    default:
      return state;
  }
}

export default authReducer;
