const users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../env");
const { userValidation } = require("../validation/userValidation");
const { profileValidation } = require("../validation/profileValidation");

module.exports.list = (req, res) => {
	users.findOne({ email: req.body.email }).then((user) => {
		if (!user) {
			res.status(400).json({ user: "user does not exist" });
		}
		res.json(user);
	});
};

module.exports.create = (req, res) => {
	const firstName = req.body.user.firstName;
	const lastName = req.body.user.lastName;
	const city = req.body.user.city;
	const state = req.body.user.state;
	const email = req.body.user.email;

	let zipcode = req.body.user.zipcode;
	let password = req.body.user.password;

	zipcode = parseInt(zipcode);

	users.findOne({ email: req.body.user.email }).then(async (userProfile) => {
		const errors = userValidation(req, res, userProfile);
		if (userProfile) {
			errors.email = "User already exists";
			return res.status(400).json(errors);
		}

		if (Object.keys(errors).length) {
			return res.status(400).json({ errors: errors });
		}

		const newUser = new users({
			firstName,
			lastName,
			city,
			state,
			zipcode,
			email,
			password,
		});

		const salt = await bcrypt.genSalt(10);

		newUser.password = await bcrypt.hash(password, salt);

		newUser
			.save()
			.then((User) => {
				const registeredUser = {};
				registeredUser.email = User.email;
				registeredUser.id = User._id;
				jwt.sign(
					{ user: registeredUser },
					process.env.SECRET || env.secret,
					function (err, token) {
						const user = {};
						user.token = token;
						user.email = User.email;
						user.id = User._id;
						user.city = User.city;
						user.state = User.state;
						user.zipcode = User.zipcode;
						user.settings = User.settings;

						return res.json(user);
					}
				);
			})
			.catch((err) => console.log(err), res.json(err));
	});
};

module.exports.saveProfile = async (req, res) => {
	const header = req.headers["authorization"];
	const bearer = header.split(" ");
	const token = bearer[1];

	const authorizedData = jwt.decode(token);
	const User = {};
	if (req.body.User.password === "" && req.body.User.password2 === "") {
		User.firstName = req.body.User.firstName;
		User.lastName = req.body.User.lastName;
		User.city = req.body.User.city;
		User.state = req.body.User.state;
		User.zipcode = req.body.User.zipcode;
		User.email = req.body.User.email;
	} else {
		User.firstName = req.body.User.firstName;
		User.lastName = req.body.User.lastName;
		User.city = req.body.User.city;
		User.state = req.body.User.state;
		User.zipcode = req.body.User.zipcode;
		User.email = req.body.User.email;
		User.password = req.body.User.password;
		User.password2 = req.body.User.password2;
	}

	users.findOne({ email: req.body.User.email }).then(async (userProfile) => {
		const errors = profileValidation(User);
		if (req.body.User.email !== authorizedData.user.email) {
			if (userProfile) {
				errors.email = "User already exists";
				return res.status(400).json(errors);
			}
		}

		if (Object.keys(errors).length) {
			return res.status(400).json({ errors: errors });
		}

		if (req.body.User.password !== "") {
			const salt = await bcrypt.genSalt(10);

			User.password = await bcrypt.hash(req.body.User.password, salt);
		}
		const update = await users.findOneAndUpdate(
			{ email: authorizedData.user.email },
			{ ...User },
			{ new: true }
		);

		if (!update) {
			res.status(400).json({ error: "Updating error" });
		}

		const profileUser = {};
		profileUser.email = User.email;
		profileUser.id = authorizedData.user.id;

		jwt.sign({ user: profileUser }, process.env.SECRET || env.secret, function (
			err,
			token
		) {
			User.firstName = update.firstName;
			User.lastName = update.lastName;
			User.city = update.city;
			User.state = update.state;
			User.zipcode = update.zipcode;
			User.token = token;
			res.json(User);
		});

		// 	res.json({
		// 		settings: update.settings,
		// 		id: update._id,
		// 		email: update.email,
		// 	});
		// });
	});
};
