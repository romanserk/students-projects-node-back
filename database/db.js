// heroku

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const sequelize = new Sequelize(
  "heroku_a303e8ca3530ece",
  "b1861d7d0ba273",
  "59d726c3",
  {
    host: "us-cdbr-iron-east-05.cleardb.net",
    dialect: "mysql",
    operatorsAliases: false,
    Op: Op,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("students_projects", "root", "1234", {
//   host: "localhost",
//   dialect: "mysql",
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

module.exports = sequelize;

// const Sequelize = require('sequelize')
// const sequelize = new Sequelize('students_projects', 'root', 'towerlow1303', {
//     host: '35.184.213.68',
//     dialect: 'mysql'
// })

// module.exports = sequelize
