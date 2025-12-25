const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  genre: [String],
  rating: Number,
  year: Number,
  description: String,
  category: String,     // trending, popular, originals
  featured: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
