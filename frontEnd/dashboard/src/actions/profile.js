const axios = require("axios");

export function saveProfile(token, User) {
	return async function (dispatch) {
		const config = {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({ User });

		try {
			const res = await axios.post("/users/save", body, config);

			dispatch(userProfile("PROFILE", res.data));
		} catch (err) {
			dispatch(userProfile("ERRORS", { errors: err.response.data }));
		}
	};
}

function userProfile(TYPE, message) {
	return {
		type: TYPE,
		payload: message,
	};
}
