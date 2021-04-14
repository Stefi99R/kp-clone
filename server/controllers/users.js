const express = require("express");

const router = express.Router();
const passport = require("passport");

const { getUsers, getUser } = require("../services/user");

router.get("/",
    [
        passport.authenticate("jwt", { session: false }),
    ],
    getUsers
);
router.get("/me",
    [
        passport.authenticate("jwt", { session: false }),
    ],
    getUser
);

module.exports = router;