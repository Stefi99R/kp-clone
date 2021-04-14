const express = require('express');

const router = express.Router();

const { getAds } = require("./../services/ad");

router.get("/", getAds);

module.exports = router;