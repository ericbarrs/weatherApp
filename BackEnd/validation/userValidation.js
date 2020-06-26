module.exports.userValidation = (req, res) => {
	const errors = {};
	const regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;

	const password2 = req.body.user.password2;
	const firstName = req.body.user.firstName;
	const lastName = req.body.user.lastName;
	const city = req.body.user.city;
	const state = req.body.user.state;
	const email = req.body.user.email;
	const password = req.body.user.password;
	const zipcode = parseInt(req.body.user.zipcode);

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
	if (password) {
		if (password.length < 8 || password.length > 25) {
			errors.password = "Password must be between 8 and 25 characters";
		}
	} else {
		errors.password = "Password can not be blank";
	}

	if (password2 !== password) {
		errors.password = "passwords are not the same";
	}
	if (!regexp.test(zipcode)) {
		errors.zipcode = "Zipcode must be 5 characters";
	}

	return errors;
};
