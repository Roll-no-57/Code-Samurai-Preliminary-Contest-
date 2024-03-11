const express = require("express");
const router = express.Router(/* { mergeParams: true } */);

// Require controllers.
const trainsController = require("../controllers/trainsController");

router.post("/trains", trainsController.create_train);


module.exports = router;