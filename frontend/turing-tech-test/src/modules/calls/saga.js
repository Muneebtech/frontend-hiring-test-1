import { call, put, takeLatest } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import { REQUEST } from '../common/actions';
import callsApi from '../../services/calls';
import callsActions, {
  GET_CALL,
  GET_CALLS
} from './actions';


export function* handleCalls({ payload }) {
  try {
    const { data } = yield call(callsApi.getCalls, payload);
    yield put(callsActions.getCalls.success( {data:data} ));
    window.scrollTo(0, 40);
  } catch (error) {
    yield put(callsActions.getCalls.failure(error));
    antMessage.error(error.message, 5);
  }
}
export function* handleCall({ payload }) {
  try {
    const { data } = yield call(callsApi.getCall, payload);
    yield put(callsActions.getCall.success({ formDetails: data }));
    window.scrollTo(0, 40);
  } catch (error) {
    yield put(callsActions.getCall.failure(error));
    antMessage.error(error.message, 5);
  }
}



export default function* callsWatcher() {
  yield takeLatest(GET_CALLS[REQUEST], handleCalls);
  yield takeLatest(GET_CALL[REQUEST], handleCall);

}
