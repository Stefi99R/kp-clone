"use strict";

const passport = require("passport");

passport.use(require("./passport-strategies/jwt"));

module.exports = passport;