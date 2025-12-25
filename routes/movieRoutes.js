const express = require('express');
const Movie = require('../models/Movies');

const router = express.Router();

// GET all movies or by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const movies = category
      ? await Movie.find({ category })
      : await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET featured movie
router.get('/featured', async (req, res) => {
  try {
    const movie = await Movie.findOne({ featured: true });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch {
    res.status(404).json({ message: 'Movie not found' });
  }
});

// POST movie (used by Postman)
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const saved = await movie.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
