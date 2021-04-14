const express = require("express");
const router = express.Router();
const users = require("./users");
const ads = require("./ads");
const auth = require("./auth");

router.use('/users', users);
router.use('/ads', ads);
router.use('/auth', auth);

module.exports = router;