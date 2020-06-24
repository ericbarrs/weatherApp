import env from "../env";

export function loginUser(user) {
	return async function (dispatch) {
		const res = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		}).catch((err) => console.log(err));

		try {
			const userObj = await res.json();
			localStorage.setItem("user", userObj.email);
			localStorage.setItem("token", userObj.token);
			localStorage.setItem("id", userObj.id);

			dispatch(userProfile("LOGIN", userObj));
			dispatch(fetchWeather(userObj.zipcode));
		} catch (error) {
			console.log(error);
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
		const url = `http://api.weatherstack.com/forecast?access_key=${
			process.env.ACCESS_KEY || env.access_key
		}&query=${zipcode}`;

		// let dateObj = new Date();
		// let month = dateObj.getUTCMonth() + 1; //months from 1-12
		// let day = dateObj.getUTCDate();
		// let year = dateObj.getUTCFullYear();

		// const newdate = year + "-" + month + "-" + day;

		const result = await fetch(url);

		const weather = await result.json();

		dispatch(weatherProfile("FETCH", weather));
	};
}

function weatherProfile(TYPE, data) {
	return {
		type: TYPE,
		payload: data,
	};
}

function userProfile(TYPE, message) {
	return {
		type: TYPE,
		payload: message,
	};
}
