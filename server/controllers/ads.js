const express = require('express');
const passport = require('passport');

const router = express.Router();

const { getAds, getAd, storeAd } = require("./../services/ad");

router.get("/", getAds);
router.get("/:id", getAd);
router.post("/", 
    [
        passport.authenticate("jwt", { session: false }),
    ],
    storeAd
);

module.exports = router;