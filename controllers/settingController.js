const user = require("../models/usersModel");
const jwt = require("jsonwebtoken");

module.exports.saveSettings = async (req, res) => {
	const header = req.headers["authorization"];
	const bearer = header.split(" ");
	const token = bearer[1];

	const authorizedData = jwt.decode(token);

	const update = await user.findOneAndUpdate(
		{ email: authorizedData.user.email },
		{ settings: req.body.settings },
		{ new: true }
	);

	if (!update) {
		res.status(400).json({ user: "user does not exist" });
	}

	res.json({ settings: update.settings });
};
