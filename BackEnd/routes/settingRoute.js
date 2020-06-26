const express = require("express");
const { saveSettings } = require("../controllers/settingController");
const router = express.Router();
const { checkToken } = require("../utils/checkToken");

router.post("/", checkToken, saveSettings);

module.exports = router;
