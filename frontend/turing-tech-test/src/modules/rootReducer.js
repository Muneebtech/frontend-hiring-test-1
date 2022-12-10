import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./auth/reducer";
import callsReducer from "./calls/reducer";

import usersReducer from "./users/reducer";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    authReducer,
    callsReducer,
    usersReducer,
  });

export default rootReducer;
