const express = require("express");
const app = express();
const users = require("./routes/usersRoute");
const login = require("./routes/loginRoute");
const settings = require("./routes/settingRoute");
const weather = require("./routes/weatherRoute");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 5000;

app.use(express.json({ limit: "100kb" }));

app.use("/users", users);
app.use("/login", login);
app.use("/settings", settings);
app.use("/weather", weather);

mongoose
	.connect(
		process.env.DB ||
			"mongodb+srv://eric:eric1234@cluster0-jmtd8.mongodb.net/WeatherApp?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log("DB connected");
	})
	.catch((err) => {
		console.log(`DB Error ${err}`);
	});

let protected = ["transformed.js", "main.css", "favicon.ico"];

app.get("*", (req, res) => {
	let path = req.params["0"].substring(1);

	if (protected.includes(path)) {
		// Return the actual file
		res.sendFile(path.join(__dirname, "build", path));
	} else {
		res.sendFile(path.join(__dirname, "build", "index.html"));
	}
});

app.listen(port, (err) => {
	if (err) console.log(err);
	else console.log(`listening on port ${port}`);
});
