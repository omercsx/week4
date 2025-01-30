const express = require("express");
const router = express.Router();

const { insertMovies } = require("../controllers/MovieController");

router.post("/import", insertMovies);

module.exports = router;
