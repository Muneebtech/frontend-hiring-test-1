import axios from 'axios';
import { USERS_BASE_URL } from './../components/constants/config/config.dev';
const host = window.location.origin;

export const signin = async ({ email, password }) =>
  axios.post(`${USERS_BASE_URL}/auth/login`, { email, password });

export const signout = latest => {
  const refreshToken = localStorage.getItem(`${host}_tokens`);
  const token = JSON.parse(refreshToken).refresh.token;
  return new Promise((resolve, reject) => {
    axios
      .post(`${USERS_BASE_URL}/auth/logout`, { refreshToken: token, latest: latest })
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};
