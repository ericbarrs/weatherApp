const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("../models/usersModel");
const { saveSettings } = require("../controllers/settingController");
const env = require("../env");
const router = express.Router();

const checkToken = (req, res, next) => {
	const header = req.headers["authorization"];

	if (typeof header !== "undefined") {
		const bearer = header.split(" ");
		const token = bearer[1];

		req.token = token;

		jwt.verify(
			req.token,
			process.env.SECRET || env.secret,
			(err, authorizedData) => {
				if (err) {
					//If error send Forbidden (403)
					console.log("ERROR: Could not connect to the protected route");
					res.sendStatus(403);
				} else {
					//If token is successfully verified, we can send the autorized data
					next();
				}
			}
		);
	} else {
		//If header is undefined return Forbidden (403)
		res.sendStatus(403);
	}
};
router.post("/", checkToken, saveSettings);

module.exports = router;
