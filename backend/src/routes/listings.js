const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");

router.get("/", listingController.getListings);
router.get("/:id", listingController.getListingById);

module.exports = router;
