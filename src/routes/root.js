const express = require("express");
const router = express.Router(/* { mergeParams: true } */);

// URL = '/'
router.get("/", function (req, res, next) {
    res.send("Welcome to the home page!");
});

module.exports = router;
