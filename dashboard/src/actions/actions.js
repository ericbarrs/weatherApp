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
			dispatch(fetchWeather(res.data.zipcode));
			dispatch(auth("SUCCESS"));
		} catch (err) {
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			localStorage.removeItem("id");

			dispatch(userProfile("LOGOUT", {}));
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
			dispatch(fetchWeather(res.data.User.zipcode));
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

export function fetchWeather(zipcode) {
	return async function (dispatch) {
		const url = `http://api.weatherstack.com/forecast?access_key=${process.env.ACCESS_KEY}&query=${zipcode}`;
		try {
			const weather = await axios.get(url);

			try {
				const index = Object.keys(weather.data.forecast);
				const forcast = weather.data.forecast[index];
				weather.data.forecast = forcast;

				dispatch(weatherProfile("FETCH", weather.data));
			} catch (err) {
				console.log(err);
			}
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
