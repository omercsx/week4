const fs = require("fs");
const path = require("path");
const Movie = require("../models/Movie");
const connectDB = require("../../db");

// import movies from movies.json into mongodb
const insertMovies = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../../movies.json");
    const movies = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    await connectDB();
    const insertedMovies = await Movie.find({});
    if (insertedMovies.length > 0) {
      res.status(200).json({ author: "Omer", message: "Movies already inserted" });
      return;
    }
    await Movie.insertMany(movies);
    res.status(200).json({ message: "Movies inserted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error ${error.message}` });
  }
};

// get all movies
const getAllMovies = async (req, res) => {
  try {
    await connectDB();
    const movies = await Movie.find({});
    res.status(200).json({ message: "Movies fetched successfully", count: movies.length, movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error fetching movies ${error.message}` });
  }
}

// get a movie by id
const getMovieById = async (req, res) => {
  try {
    await connectDB();
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({ message: "Movie fetched successfully", movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error fetching movie ${error.message}` });
  }
}

// create a movie
const createMovie = async (req, res) => {
  try {
    await connectDB();
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json({ message: "Movie created successfully", newMovie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error creating movie ${error.message}` });
  }
}

// update a movie
const updateMovie = async (req, res) => {
  try {
    await connectDB();
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Movie updated successfully", movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error updating movie ${error.message}` });
  }
}

// delete a movie
const deleteMovie = async (req, res) => {
  try {
    await connectDB();
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      res.status(404).json({ message: "Movie not deleted" });
      return;
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error deleting movie ${error.message}` });
  }
}

module.exports = { insertMovies, getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
