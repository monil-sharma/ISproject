const express = require("express");
const User = require("../models/user.js");
const router = express.Router();

router.get("/read", async (req, res) => {
  try {
    const users = await User.find();
    //console.log(users);
    res.send(users);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
