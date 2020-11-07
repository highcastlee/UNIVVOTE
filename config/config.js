require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.SEQUELIZE_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": process.env.SEQUELIZE_DBNAME,
    "host": process.env.HOST,
    "dialect": "mysql"
  }, 
  "test": {
    "username": process.env.SEQUELIZE_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": process.env.SEQUELIZE_DBNAME,
    "host": process.env.HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.SEQUELIZE_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": process.env.SEQUELIZE_DBNAME,
    "host": process.env.HOST,
    "dialect": "mysql"
  }
}
