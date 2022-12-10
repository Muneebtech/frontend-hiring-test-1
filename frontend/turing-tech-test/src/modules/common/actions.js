import _ from 'lodash';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const createRequestTypes = base => {
  const CONST = _.reduce(
    [REQUEST, SUCCESS, FAILURE],
    (acc, type) => {
      acc[type] = `${base}_${type}`;
      return acc;
    },
    {}
  );
  CONST.toString = () => base;
  return CONST;
};

export function action(type, payload = {}) {
  return { type, ...payload };
}

const actions = {
};

export default actions;
