import { fork, all } from "redux-saga/effects";

import {
  handleSigninSubmit,
  handleSignout,
} from "./auth/saga";
import callsWatcher from "./calls/saga";


import usersSagas from "./users/saga";


export default function* rootSaga() {
  yield all([
    fork(handleSigninSubmit),
    fork(handleSignout),
    fork(usersSagas),
    fork(callsWatcher)
  ]);
}
