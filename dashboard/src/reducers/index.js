import { combineReducers } from "redux";
// import weatherState from "../components/testData";

let initialUserState = {
	token: localStorage.getItem("token"),
	email: localStorage.getItem("user"),
	id: localStorage.getItem("id"),
	isAuthenticated: false,
	loading: true,
	errors: {},
};

let logOutState = {
	token: "",
	email: "",
	id: "",
	errors: {},
	isAuthenticated: false,
	loading: false,
};

let initialWeatherState = {};

function user(state = initialUserState, action) {
	if (action.type === "LOGIN") {
		return (state = {
			...state,
			...action.payload,
			errors: {},
			isAuthenticated: true,
			loading: false,
		});
	} else if (action.type === "REGISTER") {
		return (state = {
			...state,
			...action.payload,
			errors: {},
			isAuthenticated: true,
			loading: false,
		});
	} else if (action.type === "SETTINGS") {
		return (state = { ...state, ...action.payload, loading: false });
	} else if (action.type === "ERRORS") {
		return (state = { ...state, ...action.payload, loading: false });
	} else if (action.type === "LOGOUT") {
		return (state = logOutState);
	} else {
		return state;
	}
}

function weather(state = initialWeatherState, action) {
	if (action.type === "FETCH") {
		// return state;
		return (state = { ...state, ...action.payload });
	} else {
		return state;
	}
}

const rootReducer = combineReducers({
	user,
	weather,
});
export default rootReducer;
