import types from './action-types';

const initialState = {
  data: {
    getMostReviewedProducts: {status: "fetching", result: []},
    getReactionCount: {status: "fetching", result: []},
    getFirstTimeReviewedProductList: {status: "fetching", result: []},
    getOperatedUserContentCount: {status: "fetching", result: []},
    getDailyReviewCount: {status: "fetching", result: []},
  },
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_GET_DATA:
      return {
        ...state,
        loading: true,
      };
    case types.RESOLVE_DATA:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    default:
      return state;
  }
};
