const users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../env");

module.exports.list = (req, res) => {
	users.findOne({ email: req.body.email }).then((user) => {
		if (!user) {
			res.status(400).json({ user: "user does not exist" });
		}
		res.json(user);
	});
};

module.exports.create = (req, res) => {
	const errors = {};

	const password2 = req.body.password2;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const city = req.body.city;
	const state = req.body.state;
	const email = req.body.email;

	let zipcode = req.body.zipcode;
	let password = req.body.password;

	zipcode = parseInt(zipcode);

	users.findOne({ email: req.body.email }).then(async (userProfile) => {
		const regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
		if (userProfile) {
			errors.user = "User already exists";
			return res.status(400).json(errors);
		}
		if (email === "") {
			errors.email = "Email name can not be blank";
		}
		if (firstName === "") {
			errors.firstName = "First name can not be blank";
		}
		if (lastName === "") {
			errors.lastName = "Last name can not be blank";
		}
		if (city === "") {
			errors.city = "City can not be blank";
		}
		if (state === "") {
			errors.state = "State can not be blank";
		}
		if (password.length < 8 || password.length > 25) {
			errors.password = "Password must be between 8 and 25 characters";
		}
		if (password2 !== password) {
			errors.password = "passwords are not the same";
		}
		if (!regexp.test(zipcode)) {
			errors.zipcode = "Zipcode must be 5 characters";
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
			.then((User) =>
				jwt.sign({ foo: "bar" }, process.env.SECRET || env.secret, function (
					err,
					token
				) {
					const user = {};
					user.token = token;
					user.email = User.email;
					user.id = User._id;
					user.city = User.city;
					user.state = User.state;
					user.zipcode = User.zipcode;

					return res.json(user);
				})
			)
			.catch((err) => console.log(err));
	});
};
