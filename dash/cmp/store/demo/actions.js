import types from './action-types';

export const requestGetDummyData = () => {
  return {
    type: types.REQUEST_GET_DUMMY_DATA,
  };
};

export const successGetDummyData = (data) => {
  return {
    type: types.SUCCESS_GET_DUMMY_DATA,
    data,
  };
};

export const failGetDummyData = (err) => {
  return {
    type: types.FAIL_GET_DUMMY_DATA,
    err,
  };
};
