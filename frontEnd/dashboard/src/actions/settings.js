const axios = require("axios");

export function saveSettings(token, settings) {
	return async function (dispatch) {
		const config = {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({ settings });

		try {
			const res = await axios.post("/settings", body, config);
			dispatch(userProfile("SETTINGS", res.data));
		} catch (err) {
			dispatch(userProfile("ERRORS", err.response.data));
		}
	};
}

function userProfile(TYPE, message) {
	return {
		type: TYPE,
		payload: message,
	};
}
