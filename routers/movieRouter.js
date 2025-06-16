const express = require("express");
const router = express.Router();
const { index } = require("../controllers/movieController")

router.get("/", index);

module.exports = router;
