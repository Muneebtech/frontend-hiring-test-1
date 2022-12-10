import { GET_CALL, GET_CALLS } from "./actions";

const initialState = {
  formDetails: {
    loading: false,
    error: false,
  },
};

function callsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_CALLS.REQUEST:
    case GET_CALL.REQUEST:
      return { ...state, loading: true };

    case GET_CALLS.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        calls:[payload.data],
      };

    case GET_CALL.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        call:{payload}
      };

    case GET_CALLS.FAILURE:
    case GET_CALL.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };

    default:
      return state;
  }
}

export default callsReducer;
