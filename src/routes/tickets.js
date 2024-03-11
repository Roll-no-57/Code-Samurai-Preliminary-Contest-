const express = require("express");
const router = express.Router(/* { mergeParams: true } */);

// Require controllers.
const ticketsController = require("../controllers/ticketsController");

router.get("/tickets", ticketsController.get_tickets);

module.exports = router;