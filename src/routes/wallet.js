const express = require("express");
const router = express.Router(/* { mergeParams: true } */);

// Require controllers.
const walletController = require("../controllers/walletController");

// GET /wallet
router.get("/wallets/:wallet_id", walletController.get_wallet);
router.put("/wallets/:wallet_id", walletController.add_balance);

module.exports = router;