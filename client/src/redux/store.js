import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import noteReducer from "./reducers/noteReducer";
import authReducer from "./reducers/authReducer";
// import thunk from "redux-thunk";

// Reducers
const rootReducer = combineReducers({
  note: noteReducer,
  auth: authReducer
});

const initialState = {};

const middleware = [];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
