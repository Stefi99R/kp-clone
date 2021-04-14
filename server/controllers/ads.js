const express = require('express');
const passport = require('passport');

const router = express.Router();

const { 
    getAds, 
    getAd, 
    storeAd, 
    updateAd, 
    removeAd, 
    countUp 
} = require("./../services/ad");

router.get("/", getAds);
router.get("/:id", getAd);
router.get("/count/:id", countUp);
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
router.delete("/:id",
    [
        passport.authenticate("jwt", { session: false }),
    ],
    removeAd
);

module.exports = router;