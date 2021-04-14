const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require("http");

const { sequelize } = require("./database/models");

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const server = http.createServer(app);

if (process.env.NODE_ENV !== "test") {
    sequelize
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