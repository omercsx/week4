const express = require("express");
const router = express.Router();

const {
  insertMovies,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  createMovie,
} = require("../controllers/MovieController");

router.post("/import", insertMovies);

// route to get all movies
router.get("/", getAllMovies);

// route to get a movie by id
router.get("/:id", getMovieById);

// route to update a movie
router.put("/update/:id", updateMovie);

// route to delete a movie
router.delete("/delete/:id", deleteMovie);

// route to create a movie
router.post("/create", createMovie);

module.exports = router;
