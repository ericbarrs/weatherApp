module.exports.profileValidation = (User) => {
	const errors = {};
	const regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;

	const password2 = User.password2;
	const firstName = User.firstName;
	const lastName = User.lastName;
	const city = User.city;
	const state = User.state;
	const email = User.email;
	const zipcode = parseInt(User.zipcode);
	const password = User.password;

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
	if (User.password) {
		if (password.length < 8 || password.length > 25) {
			errors.password = "Password must be between 8 and 25 characters";
		}
	}
	if (User.password || User.password2) {
		if (password2 !== password) {
			errors.password = "passwords are not the same";
		}
	}
	if (!regexp.test(zipcode)) {
		errors.zipcode = "Zipcode must be 5 characters";
	}

	return errors;
};
