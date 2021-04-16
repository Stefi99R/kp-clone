const { User } = require("../database/models");
const jwt = require("jsonwebtoken");
bcrypt = require("bcrypt");
const secret = process.env["JWT_SECRET"];

const register = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).send("Please fill in all the fields.");
        }

        let user = await User.findAll({
            where: { username: req.body.username }
        });

        if (user[0]) return res.status(400).send("User already exists.");

        user = req.body;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        user = await User.create(user);
        const userJson = user.toJSON();

        res.send({ msg: "Successfully registered.", user: userJson });

    } catch(error) {
        return next(error);
    }
};

const login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send("Please fill in all the fields.");
    }
    try {
        const user = await User.findOne({
            where: { username: req.body.username }
        });
        if (!user) {
            return res.status(400).send("Invalid username or password.");
        }

        //const isMatch = await bcrypt.compare(password, user.password);
        //if (!isMatch) {
            //return res.status(400).send({ msg: "Invalid username or password."});
        //}

        const token = jwt.sign(
            {id: user.id, username: user.username },
            secret
        );
        res.header("Authentication-token", token).send({token});
    } catch(error) {
        next(error);
    }
};

module.exports = { register, login };