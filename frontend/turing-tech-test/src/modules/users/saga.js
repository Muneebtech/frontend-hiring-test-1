import { call, put, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import { REQUEST } from '../common/actions';
import usersApi from '../../services/users';
import usersActions, {
  GET_USER
} from './actions';


export function* handleGetUser({ payload }) {
  try {
    const { data } = yield call(usersApi.getUser, payload);
    yield put(usersActions.getUser.success({ formDetails: data }));
    window.scrollTo(0, 40);
  } catch (error) {
    yield put(usersActions.getUser.failure(error));
    antMessage.error(error.message, 5);
  }
}



export default function* usersWatcher() {
  yield takeLatest(GET_USER[REQUEST], handleGetUser);

}
