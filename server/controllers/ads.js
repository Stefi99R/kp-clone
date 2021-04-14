const express = require('express');

const router = express.Router();

const { getAds, getAd } = require("./../services/ad");

router.get("/", getAds);
router.get("/:id", getAd);

module.exports = router;