const users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

		const User = {};
		User.email = user.email;
		User.id = user._id;

		jwt.sign(
			{ user: User },
			process.env.SECRET || "IcantTellYouAnything",
			function (err, token) {
				User.firstName = user.firstName;
				User.lastName = user.lastName;
				User.city = user.city;
				User.state = user.state;
				User.zipcode = user.zipcode;
				User.settings = user.settings;
				User.token = token;
				res.json(User);
			}
		);
	});
};

module.exports.verify = (req, res) => {
	const header = req.headers["authorization"];
	const bearer = header.split(" ");
	const token = bearer[1];

	jwt.verify(
		token,
		process.env.SECRET || "IcantTellYouAnything",
		(err, authorizedData) => {
			if (err) {
				//If error send Forbidden (403)
				console.log(err);
				res.sendStatus(403);
			} else {
				users.findOne({ email: authorizedData.user.email }).then((user) => {
					const User = {};
					User.firstName = user.firstName;
					User.lastName = user.lastName;
					User.email = user.email;
					User.id = user._id;
					User.city = user.city;
					User.state = user.state;
					User.zipcode = user.zipcode;
					User.settings = user.settings;
					res.status(200).json({ User });
				});
			}
		}
	);
};
