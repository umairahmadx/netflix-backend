const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* GET MY LIST */
router.get("/my-list", auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate("myList");
  res.json(user.myList);
});

/* ADD TO MY LIST */
router.post("/my-list/:movieId", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user.myList.includes(req.params.movieId)) {
    user.myList.push(req.params.movieId);
    await user.save();
  }

  res.json({ message: "Movie added to My List" });
});

/* REMOVE FROM MY LIST */
router.delete("/my-list/:movieId", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  user.myList = user.myList.filter(
    (id) => id.toString() !== req.params.movieId
  );

  await user.save();
  res.json({ message: "Movie removed from My List" });
});

module.exports = router;