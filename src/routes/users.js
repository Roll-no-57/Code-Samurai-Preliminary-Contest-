const express = require("express");
const router = express.Router(/* { mergeParams: true } */);

// Require controllers.
const usersController = require("../controllers/usersController");

// POST api/users
router.post("/users", usersController.create_user);

module.exports = router;