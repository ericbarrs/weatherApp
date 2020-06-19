const user = require("../models/usersModel");

module.exports.saveSettings = async (req, res) => {
	const update = await user.findOneAndUpdate(
		{ _id: req.body.id },
		{ settings: req.body.settings },
		{ new: true }
	);

	if (!update) {
		res.status(400).json({ user: "user does not exist" });
	}
	res.json({ settings: update.settings, id: update._id, email: update.email });
};
