import { call, take, put, select, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import authActions, {
  SIGNIN,
  SIGNOUT
} from './actions';
import { action, REQUEST } from '../common/actions';
import {
  signin,
  signout
} from '../../services/auth';
import { unSetSessionCookies, setSessionCookies } from '../common/utils';

export function* handleSigninRequest(action) {
  try {
    const { data } = yield call(signin, action.payload);
    yield put(authActions.signin.success(data));
    setSessionCookies({ user: data.user, tokens: data.tokens });
  } catch (error) {
    if (error.message === 'Request failed with status code 400') {
    } else if (error.message === 'Request failed with status code 401') {
    } else if (error.message === 'Request failed with status code 503') {
      antMessage.error('Maximum Active Sessions');
    } else if (error.message === 'Request failed with status code 502') {
      antMessage.error('Your account has been suspended. Contact Admin');
    } else {
      antMessage.error('Interval Server Error');
    }
    yield put(authActions.signin.failure(error));
  }
}

export function* handleSigninSubmit() {
  yield takeLatest(SIGNIN.REQUEST, handleSigninRequest);
}

export function* handleSignout() {
  while (true) {
    try {
      const { payload } = yield take(SIGNOUT[REQUEST]);
      yield call(signout, 'true');

      unSetSessionCookies();
      yield put(authActions.signout.success());
      window.location.href = '/';
    } catch (error) {
      const { code, message } = error;
      yield put(authActions.signout.success({ code, message }));
    }
  }
}

