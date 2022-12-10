import axios from 'axios';

import { USERS_BASE_URL } from './../components/constants/config/config.dev';
import { apiWrapper, requestInterceptor } from './interceptors';

const request = axios.create({ baseURL: USERS_BASE_URL });
request.interceptors.request.use(requestInterceptor);

const api = {
  getRoles: async () => request.get('/roles'),
  getChannels: async () => request.get('/channels'),
  getUsers: async () => request.get(`/users`),
  addUser: async newUser =>
    request.post('/users', newUser, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  getUser: async userId => request.get(`/users/${userId}`),
  updateUser: async ({ userId, data }) =>
    request.patch(`/users/${userId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  deleteUser: async ({ userId, data }) => request.post(`/users/${userId}`, data),
  getUsers: async params => request.get(`/users`, { params }),
};

export default apiWrapper(api);
