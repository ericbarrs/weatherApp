const axios = require("axios");

export function registerUser(user) {
	return async function (dispatch) {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({ user });

		try {
			const res = await axios.post("/users", body, config);
			localStorage.setItem("user", res.data.email);
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("id", res.data.id);

			dispatch(userProfile(res.data));
		} catch (err) {
			dispatch(userProfile("ERRORS", err.response.data));
		}
	};
}

export function dismissAlert(props, field) {
	console.log(props);
}

function userProfile(TYPE, data) {
	return {
		type: TYPE,
		payload: data,
	};
}
