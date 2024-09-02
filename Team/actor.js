const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  director_id: {
    type: Number,
    required: true,
  },
  movie_name: {
    type: String,
    required: true,
  },
  lead_actor: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
