const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 5432,
    pool: {
      max: 5,
      min: 0,
    },
  }
);
module.exports = db;
