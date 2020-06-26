const jwt = require("jsonwebtoken");
const env = require("../env");

module.exports.checkToken = (req, res, next) => {
	const header = req.headers["authorization"];

	if (typeof header !== "undefined") {
		const bearer = header.split(" ");
		const token = bearer[1];

		jwt.verify(token, process.env.SECRET || env.secret, (err) => {
			if (err) {
				//If error send Forbidden (403)
				console.log("ERROR: Could not connect to the protected route");
				res.sendStatus(403);
			} else {
				//If token is successfully verified, we can send the autorized data
				next();
			}
		});
	} else {
		//If header is undefined return Forbidden (403)
		res.sendStatus(403);
	}
};
