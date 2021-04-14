const express = require('express');
const passport = require('passport');

const router = express.Router();

const { getAds, getAd, storeAd, updateAd } = require("./../services/ad");

router.get("/", getAds);
router.get("/:id", getAd);
router.post("/", 
    [
        passport.authenticate("jwt", { session: false }),
    ],
    storeAd
);
router.patch("/:id",
    [
        passport.authenticate("jwt", { session: false }),
    ],
    updateAd
);

module.exports = router;