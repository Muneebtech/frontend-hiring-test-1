import axios from 'axios';

import { USERS_BASE_URL } from './../components/constants/config/config.dev';
import { apiWrapper, requestInterceptor } from './interceptors';

const request = axios.create({ baseURL: USERS_BASE_URL });
request.interceptors.request.use(requestInterceptor);

const api = {
  getUsers: async () => request.get(`/users`),
  addUser: async newUser =>
    request.post('/users', newUser, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  getUser: async userId => request.get(`/users/${userId}`),
};

export default apiWrapper(api);
