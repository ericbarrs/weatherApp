const express = require("express");
const { weatherData } = require("../controllers/weatherController");
const { checkToken } = require("../utils/checkToken");

const router = express.Router();

router.post("/", checkToken, weatherData);

module.exports = router;
