"use strict";

require("dotenv").config();

if (
    !process.env.POSTGRES_USER ||
    !process.env.POSTGRES_PASSWORD ||
    !process.env.POSTGRES_DB ||
    !process.env.POSTGRES_HOST
) {
    throw new Error(
        "Postgres database credentials not set. Please update postgres credentials in the .env file."
    );
}

module.exports = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        dialect: "postgres"
    },

    test: {
        username: process.env.POSTGRES_USER_TEST,
        password: process.env.POSTGRES_PASSWORD_TEST,
        database: process.env.POSTGRES_DB_TEST,
        host: process.env.POSTGRES_HOST_TEST,
        dialect: "postgres"
    },

    production: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        dialect: "postgres"
    }
}