import { combineReducers } from "redux";

let initialUserState = {};

let initialWeatherState = {};

function user(state = initialUserState, action) {
	if (action.type === "LOGIN") {
		return (state = action.payload);
	} else if (action.type === "REGISTER") {
		return (state = action.payload);
	} else if (action.type === "LOGOUT") {
		return (state = initialUserState);
	} else {
		return state;
	}
}

function weather(state = initialWeatherState, action) {
	if (action.type === "FETCH") {
		return (state = action.payload);
	} else {
		return state;
	}
}

const rootReducer = combineReducers({
	user,
	weather,
});
export default rootReducer;
