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
      res.status(200).json({ message: "Movies already inserted" });
      return;
    }
    await Movie.insertMany(movies);
    res.status(200).json({ message: "Movies inserted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error ${error.message}` });
  }
};

module.exports = { insertMovies };
