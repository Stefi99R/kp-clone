# KupujemProdajem Clone

This project is a clone of KupujemProdajem, a popular e-commerce service in Serbia. It's designed to emulate the core functionalities of the original platform, providing insights into web development with ReactJS, Express.js, Sequelize, and PostgreSQL.

## Features

- User authentication and authorization
- Product listing and detailed views
- Search functionality with filters
- User profile management
- Responsive design
- etc.

## Installation and Setup

Requires latest stable version of **Node.js** and **PostgreSQL**.

### How to run the application:

1. Install Node.js and PostgreSQL locally
2. Setup your localhost, database, username and password for connection to DB in pgAdmin or some similar database's client
3. In *server* folder start via Terminal or CMD script `npm install`
4. When installation finished, create *.env* file according to *.env.example* and insert information about your connection to DB
5. In *client* folder, create *.env* file according to *.env.example* and insert information about react service base url
6. In *client* folder start via Terminal or CMD script `npm install`
6. In *client* folder via Terminal or CMD enter script `npm start`

### Migrations

1. Inside of *server* folder via terminal enter enter command `npm run migrate`

### Seeding

1. Inside of *server* folder via terminal enter command `npm run seed`

***NOTE*** Attempting to use passwords, along with the usernames, from a table created in this way will result in error, as those passwords are not hashed

## Contributing

This project is a personal learning endeavor and is not actively maintained. Feel free to fork and extend it for your own educational purposes or projects.

## License

This project is licensed under the Apache-2.0 License.

## Acknowledgments

Thanks to the KupujemProdajem platform for inspiration, and the open-source community for the various tools and libraries used in this project.
