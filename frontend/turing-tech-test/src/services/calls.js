import axios from 'axios';

import { USERS_BASE_URL } from './../components/constants/config/config.dev';
import { apiWrapper, requestInterceptor } from './interceptors';

const request = axios.create({ baseURL: USERS_BASE_URL });
request.interceptors.request.use(requestInterceptor);

const api = {
  getCalls: async ({ ...params }) => request.get(`/call`,{ params }),
  addCall: async newUser =>
    request.post('/call', newUser, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  getCall: async userId => request.get(`/call/${userId}`),
};

export default apiWrapper(api);
