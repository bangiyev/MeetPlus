const User = require("../models/userModel");
const mongoose = require("mongoose");

const addUser = async (req, res) => {
  const { displayName, email } = req.body;
  const result = await User.exists({ email: email });
  if (!result) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(202).json({ mssg: "user already in db" });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

module.exports = { addUser, getUsers };
