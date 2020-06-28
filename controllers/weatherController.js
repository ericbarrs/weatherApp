const fetch = require("node-fetch");

module.exports.weatherData = async (req, res) => {
	try {
		const url = `http://api.weatherstack.com/forecast?access_key=${
			process.env.ACCESS_KEY || "23c611c5efe997e520072b2cfc84a332"
		}&query=${req.body.zipcode}`;
		const result = await fetch(url);
		const data = await result.json();

		console.log(data.forecast);
		if (data.forcast) {
			const index = Object.keys(data.forecast);
			const forecast = data.forecast[index];
			data.forecast = forecast;

			res.json(data);
		} else {
			res.json(data);
		}
	} catch (err) {
		res.json(err);
	}
};
