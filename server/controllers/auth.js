"use strict";

const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
    login,
    register
} = require("../services/auth");

router.post(
    "/login",
    login
);

router.post(
    "/register",
    register
);

module.exports = router;