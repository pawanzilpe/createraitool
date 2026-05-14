const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
