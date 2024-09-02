const express = require("express");
const Movie = require("../Team/actor"); 

const router = express.Router();


router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find({}, { movie_name: 1, _id: 0 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/movies", async (req, res) => {
    try {
      const { movieId, directorId, movieName, leadActor } = req.body;
      
      
      const existingMovie = await Movie.findOne({ movieId: Number(movieId) });
      if (existingMovie) {
        return res.status(400).json({ message: "Movie ID already exists" });
      }


      const existingDirector = await Movie.findOne({ director_id: Number(directorId) });
      if (existingDirector) {
        return res.status(400).json({ message: "Director ID already exists" });
      }

      const newMovie = new Movie({
        movieId: Number(movieId),
        director_id: Number(directorId),
        movie_name: movieName,
        lead_actor: leadActor,
      });
      await newMovie.save();
      res.json({ message: "Movie Successfully Added" });
    } catch (err) {
      console.error("Error in POST /movies:", err); 
      res.status(500).json({ error: err.message });
    }
});


router.get("/movies/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findOne({ movieId: Number(movieId) });
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.json(movie);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/movies/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const { directorId, movieName, leadActor } = req.body;
    
    const updatedMovie = await Movie.findOneAndUpdate(
      { movieId: Number(movieId) },
      { director_id: Number(directorId), movie_name: movieName, lead_actor: leadActor },
      { new: true }
    );
    if (!updatedMovie) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.json({ message: "Movie Details Updated" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/movies/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const deletedMovie = await Movie.findOneAndDelete({ movieId: Number(movieId) });
    if (!deletedMovie) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.json({ message: "Movie Removed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
