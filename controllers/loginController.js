const users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../env");

module.exports.login = (req, res) => {
	users.findOne({ email: req.body.email }).then(async (user) => {
		if (!user) {
			res
				.status(400)
				.json({ error: "email or password is incorrect please try again" });
			return;
		}

		const password = req.body.password;
		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			res
				.status(400)
				.json({ error: "email or password is incorrect please try again" });
			return;
		}

		jwt.sign({ foo: "bar" }, process.env.SECRET || env.secret, function (
			err,
			token
		) {
			const User = {};
			User.token = token;
			User.email = user.email;
			User.city = user.city;
			User.state = user.state;
			User.zipcode = user.zipcode;
			User.setting = user.settings;
			User.id = user._id;
			res.json(User);
		});
	});
};
