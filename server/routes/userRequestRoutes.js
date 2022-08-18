const express = require("express");

const { addUser, getUsers } = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);

router.post("/", addUser);

// router.post('/', addUserEmail);

module.exports = router;
