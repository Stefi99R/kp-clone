# KpClone
A clone of a popular e-commerce service in Serbia called KupujemProdajem, created using PostgreSQL as a database, Express.js for Backend development and ReactJS for Frontend development.

## Features
Fully responsive application with various functionalities like:
1. Login/Sign out
2. Sign up
3. Home page with clear, table display of all the ads
4. Pagination
5. Form validations with toasts
6. Various filters (contains search, based on category, price, "Only mine" (which displays only ads from the current user))
7. Detailed view of one ad, which contains detailed information about an ad, along with the data about user that are not sensitive
8. Logged users who have created ads can easily edit the data about their ads from the Edit page
9. Route guards
10. Logged users can delete the ads they posted
    And many more...

### Requirements
Latest stable version of **Node.js** and **PostgreSQL**.

### How to start the application
1. Install Node.js and PostgreSQL locally
2. Setup your localhost, database, username and password for connection to DB in pgAdmin or some similar database's client
3. In *server* folder start via Terminal or CMD script `npm install`
4. When installation finished, create *.env* file according to *.env.example* and insert information about your connection to DB
5. In *client* folder, create *.env* file according to *.env.example* and insert information about react service base url
6. In *client* folder start via Terminal or CMD script `npm install`
6. In *client* folder via Terminal or CMD enter script `npm start`

### Migrations
1. Inside of *server* folder via terminal enter enter command `npm run migrate`
**NOTE** This will create two tables (ads and users)

### Seeding
1. Inside of *server* folder via terminal enter enter command `npm run seed`
**NOTE** This will seed 10 users and 100 ads into their databases
***NOTE*** Attempting to use passwords, along with the usernames, from a table created in this way will result in error, as those passwords are not hashed
