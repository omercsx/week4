const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  movieId: {
    type: Number
  },
  title: { type: String },
  studio: { type: String },
  genres: [{ type: String }],
  directors: [{ type: String }],
  writers: [{ type: String }],
  actors: [{ type: String }],
  year: { type: Number },
  length: { type: Number },
  shortDescription: { type: String },
  mpaRating: { type: String },
  criticsRating: { type: Number },
});

const Movie = mongoose.model("Movies", MovieSchema);

module.exports = Movie;
