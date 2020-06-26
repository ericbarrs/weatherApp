const express = require("express");
const { list, create, saveProfile } = require("../controllers/usersController");
const { checkToken } = require("../utils/checkToken");

const router = express.Router();

router.get("/", list);
router.post("/", create);
router.post("/save", checkToken, saveProfile);

module.exports = router;
