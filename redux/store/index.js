import { createStore, combineReducers } from "redux";

import recordsReducer from "../reducers/RecordsReducer";
const store = createStore(
  combineReducers({
    allArray: recordsReducer,
  })
);

export default store;
