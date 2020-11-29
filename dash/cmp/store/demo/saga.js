import { call, put, takeLatest } from 'redux-saga/effects';
import types from './action-types';
import { successGetDummyData, failGetDummyData } from './actions';
import API from './api';

export function* getDummyData() {
  try {
    const data = yield call(API.fetchDummyData, 'param1', 'param2');
    yield put(successGetDummyData(data));
  } catch (error) {
    console.error('ERROR:', error);
    yield put(failGetDummyData(error));
  }
}

export default function* saga() {
  yield takeLatest(types.REQUEST_GET_DUMMY_DATA, getDummyData);
}
