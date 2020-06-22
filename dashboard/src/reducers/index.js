import { combineReducers } from "redux";

function user(state = {}, action) {
  if (action.type === "LOGIN") {
    return (state = action.payload);
  } else {
    return state;
  }
}

const rootReducer = combineReducers({
  user,
});
export default rootReducer;
