const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
	firstName: {
		type: String,
		required: true,
		max: 25,
	},
	lastName: {
		type: String,
		required: true,
		max: 25,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 25,
	},
	settings: {
		low: {
			type: Number,
			required: false,
		},
		high: {
			type: Number,
			required: false,
		},
		weather_conditions: [],
	},
});

module.exports = users = mongoose.model("users", userModel);
