const { Sequelize } = require("sequelize");

const db = new Sequelize("todo", "todoadmin", "dosomethings", {
  dialect: "mysql",
  port: 3306,
  host: 'todo-db',
  logging: console.log,
});
// const db = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     dialect: "mysql",
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 3306,
//     logging: true,
//   }
// );
module.exports = db;
