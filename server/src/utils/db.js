const { Sequelize } = require("sequelize");

const db = new Sequelize(
  "todo",
  // process.env.DB_USERNAME
  "root",
  "rootroot",
  // process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    logging: false,
  }
);

module.exports = db;
