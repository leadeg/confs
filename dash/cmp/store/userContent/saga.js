import { put, takeLatest } from 'redux-saga/effects';
import types from './action-types';
import { resolveData} from './actions';
import API from './api';

export function* getData(options) {
  let result = {};
  let getDailyReviewCount = API.getDailyReviewCount(options.getDailyReviewCount);
  let getOperatedUserContentCount = API.getOperatedUserContentCount(options.getOperatedUserContentCount);
  let getFirstTimeReviewedProductList = API.getFirstTimeReviewedProductList(options.getFirstTimeReviewedProductList);
  let getReactionCount = API.getReactionCount(options.getReactionCount);
  let getMostReviewedProducts = API.getMostReviewedProducts(options.getMostReviewedProducts);
  result.getDailyReviewCount = yield dataHelper(getDailyReviewCount);
  result.getOperatedUserContentCount = yield dataHelper(getOperatedUserContentCount);
  result.getFirstTimeReviewedProductList = yield dataHelper(getFirstTimeReviewedProductList);
  result.getReactionCount = yield dataHelper(getReactionCount);
  result.getMostReviewedProducts = yield dataHelper(getMostReviewedProducts);
  yield put(resolveData(result))
}

function* dataHelper(func) {
  try {
    const data = yield func;
    return  {
      status: "success",
      result: data,
    }
  } catch (error) {
    console.error({'ERROR:': error});
    return  {
      status: "error",
      result: error,
    }
  }
}

export default function* saga() {
  yield takeLatest(types.REQUEST_GET_DATA, getData);
}
