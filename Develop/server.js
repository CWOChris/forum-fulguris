const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

// Added from class ORM Day 1

require("dotenv").config();

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

console.log(PORT);

const fakeConnection = {
    dbname: process.env.DB_NAME,
    dbuser: process.env.DB_USER,
    dbpass: process.env.DB_PASSWORD,
}

console.log(fakeConnection);

// end of Added from class ORM Day 1