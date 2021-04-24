const express = require('express');
const authentication = require('../middlewares/authenticate');

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
        authentication,
    ],
    storeAd
);
router.patch("/:id",
    [
        authentication,
    ],
    updateAd
);
router.delete("/:id",
    [
        authentication,
    ],
    removeAd
);

module.exports = router;