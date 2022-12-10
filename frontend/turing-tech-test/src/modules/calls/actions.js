import { REQUEST, SUCCESS, FAILURE, createRequestTypes, action } from '../common/actions';

export const RESET_FORM_DETAILS = 'Users/RESET_FORM_DETAILS';
export const GET_CALLS = createRequestTypes('Users/GET_CALLS');
export const GET_CALL = createRequestTypes('Users/GET_CALL');


const callsActions = {
  resetFormDetails: () => action(RESET_FORM_DETAILS),

  getCalls: {
    request: data => action(GET_CALLS[REQUEST], { payload: data }),
    success: data => action(GET_CALLS[SUCCESS], { payload: data }),
    failure: error => action(GET_CALLS[FAILURE], { payload: error }),
  },

  getCall: {
    request: data => action(GET_CALL[REQUEST], { payload: data }),
    success: data => action(GET_CALL[SUCCESS], { payload: data }),
    failure: error => action(GET_CALL[FAILURE], { payload: error }),
  }
};

export default callsActions;
