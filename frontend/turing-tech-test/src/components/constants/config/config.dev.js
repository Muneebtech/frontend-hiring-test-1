export const USERS_BASE_URL = 'http://192.168.1.10:4000';
export const ENV = 'dev';

export const VALID_ROUTES_BY_ROLE = {
  user: {
    paths: [
      '/dashboard',
    ],
    landingPage: '/dashboard',
    redirectUrl: '/access-denied',
  }
};
