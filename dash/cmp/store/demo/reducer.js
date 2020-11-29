import types from './action-types';

const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_GET_DUMMY_DATA:
      return {
        ...state,
        loading: true,
      };
    case types.SUCCESS_GET_DUMMY_DATA:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case types.FAIL_GET_DUMMY_DATA:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
