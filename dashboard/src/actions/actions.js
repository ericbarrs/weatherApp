const axios = require("axios");

export function loginUser(user) {
	return async function (dispatch) {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify(user);

		try {
			const res = await axios.post("/login", body, config);

			localStorage.setItem("user", res.data.email);
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("id", res.data.id);

			dispatch(userProfile("LOGIN", res.data));
			dispatch(fetchWeather(res.data.token, res.data.zipcode));
			dispatch(auth("SUCCESS"));
		} catch (err) {
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			localStorage.removeItem("id");

			dispatch(userProfile("ERRORS", { errors: errors.response.data }));
		}
	};
}

export function userHasToken(token) {
	return async function (dispatch) {
		const config = {
			headers: {
				Authorization: "Bearer " + token,
			},
		};

		try {
			const res = await axios.get("/login/verify", config);
			localStorage.setItem("user", res.data.User.email);
			localStorage.setItem("id", res.data.User.id);

			dispatch(userProfile("LOGIN", res.data.User));
			dispatch(fetchWeather(token, res.data.User.zipcode));
			dispatch(auth("SUCCESS"));
		} catch (err) {
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			localStorage.removeItem("id");

			dispatch(userProfile("LOGOUT", {}));
		}
	};
}

export function logOutUser() {
	return async function (dispatch) {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		localStorage.removeItem("id");

		dispatch(userProfile("LOGOUT", {}));
	};
}

export function fetchWeather(token, zipcode) {
	return async function (dispatch) {
		const config = {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({ zipcode });
		const url = `/weather`;
		try {
			const weather = await axios.post(url, body, config);

			dispatch(weatherProfile("FETCH", weather.data));
		} catch (err) {
			console.log(err);
		}
	};
}

function weatherProfile(TYPE, data) {
	return {
		type: TYPE,
		payload: data,
	};
}

function auth(TYPE) {
	return {
		type: TYPE,
	};
}

function userProfile(TYPE, message) {
	return {
		type: TYPE,
		payload: message,
	};
}
