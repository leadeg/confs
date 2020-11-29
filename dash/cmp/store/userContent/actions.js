import types from './action-types';

export const requestGetData = (options) => {
  return {
    type: types.REQUEST_GET_DATA,
    ...options,
  };
};

export const resolveData = (data) => {
  return {
    type: types.RESOLVE_DATA,
    data,
  };
};

// export const failGetData = (err) => {
//   return {
//     type: types.FAIL_GET_DATA,
//     err,
//   };
// };
