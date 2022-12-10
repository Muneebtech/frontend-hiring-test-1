import { GET_USER, GET_USERS } from "./actions";

import { convertCompObjectToId } from "./utils";

const initialState = {
  users: [],
  formDetails: {
    firstName: "",
    lastName: "",
    loading: false,
    error: false,
  },
};

function usersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_USERS.REQUEST:
    case GET_USER.REQUEST:
      return { ...state, loading: true };

    case GET_USERS.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        ...payload,
      };

    case GET_USER.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        formDetails: convertCompObjectToId(payload.formDetails),
      };

    case GET_USERS.FAILURE:
    case GET_USER.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };

    default:
      return state;
  }
}

export default usersReducer;
