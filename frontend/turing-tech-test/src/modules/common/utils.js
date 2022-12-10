import moment from 'moment';
import _ from 'lodash';
import { newRefreshTokenTimeInterval } from './../../components/constants/options';
const host = window.location.origin;
var url = String(window.location.pathname);
export const getUserId = () => window.localStorage[`${host}_uid`] ?? '';
export const getTokens = () => JSON.parse(window.localStorage?.[`${host}_tokens`] ?? '{}');
export const getUser = () => JSON.parse(window.localStorage?.[`${host}_user`] ?? '{}');

export const unSetUserData = () => {
  window.localStorage.removeItem(`${host}_user`);
};

export const setUserData = user => {
  window.localStorage.setItem(`${host}_user`, JSON.stringify(user));
};

export const setSessionCookies = user => {
  window.localStorage[`${host}_user`] = JSON.stringify(user.user);
  window.localStorage[`${host}_uid`] = user.user.id;
  window.localStorage[`${host}_tokens`] = JSON.stringify(user.tokens);
  window.localStorage[`${host}_uuid`] = JSON.stringify(user.tokens);
  window.localStorage[`${host}_refresh_time`] = JSON.stringify(newRefreshTokenTimeInterval);
  window.localStorage[`${host}_login_time`] = moment();
  window.localStorage[`${host}_login`] = 'true';
};

export const unSetSessionCookies = () => {
  window.localStorage.removeItem(`${host}_user`);
  window.localStorage.removeItem(`${host}_uid`);
  window.localStorage.removeItem(`${host}_tokens`);
  window.localStorage.removeItem(`${host}_uuid`);
  window.localStorage.removeItem(`${host}_refresh_time`);
  window.localStorage.removeItem(`${host}_login_time`);
  window.localStorage.removeItem(`${host}_login`);
  window.localStorage.removeItem('start_date');
  window.localStorage.removeItem('end_date');
  window.localStorage.removeItem('currentPage');
};

export const setTokens = tokens => {
  window.localStorage[`${host}_tokens`] = JSON.stringify(tokens);
};


export const getQueryParam = (name, query) => {
  const regx = new RegExp(`${name}=([^&]*)`);
  const tokens = query.match(regx);
  return tokens ? tokens[1] : undefined;
};



export const formateTime = time => {
  const [startTime, endTime] = time?.split(' to ') ?? [];
  let ST = moment(startTime, ['hh:mm:ss A']);
  let ET = moment(endTime, ['hh:mm:ss A']);
  var t = ST.format('HH:mm:ss') + ' to ' + ET.format('HH:mm:ss');
  return t;
};
export const formatDate = (date, format) => {
  return moment(date).format(format);
};

export const timeDifference = (startTime, endTime, format) => {
  const start = moment(startTime, ['hh:mm:ss']);
  const end = moment(endTime, ['hh:mm:ss']);
  const diff = end.diff(start, format);
  return diff;
};
