"use strict";

const { Strategy, ExtractJwt } = require("passport-jwt");
const { User } = require("./../database/models");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env["JWT_SECRET"]
};

const jwtHandler = async (jwt_payload, done) => {
    const { username } = jwt_payload;
    try {
        const user = await User.findByUsername(username);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch(error) {
        return done(error, false);
    }
};

const jwtStrategy = new Strategy(opts, jwtHandler);

module.exports = jwtStrategy;