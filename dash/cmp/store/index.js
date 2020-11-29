import { fork, all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import saga from './userContent/saga';
import userContentReducer from './userContent/reducer';

const rootReducer = combineReducers({
  //INFO: add reducers here
  userContentReducer,
});

function* rootSaga() {
  yield all([
    fork(saga),
    // //INFO: add other sagas here
  ]);
}

export { rootReducer, rootSaga };
