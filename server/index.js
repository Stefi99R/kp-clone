const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require("http");
const routes = require("./controllers");
const passport = require("./passport");

const { sequelize } = require("./database/models");

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(passport.initialize());

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const server = http.createServer(app);

app.use("/api", routes);

if (process.env.NODE_ENV !== "test") {
    sequelize
        // check if valid data for postgre database are entered
        .authenticate()
        .then(() => {
            console.log("Connection has been established successfully.");
        })
        .catch((err) => {
            console.error("Unable to connect to the databaase: ", err);
        });

    server.listen(port, () => 
        console.log(`Example app listening at: http://localhost:${port}`)
    );
}

module.exports = app;