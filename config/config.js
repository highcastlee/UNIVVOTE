require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.SEQUELIZE_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": process.env.SEQUELIZE_DBNAME,
    "host": process.env.LOCAL,
    "dialect": "mysql"
  }, 
  "test": {
    "username": process.env.SEQUELIZE_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": process.env.SEQUELIZE_DBNAME,
    "host": process.env.LOCAL,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DBNAME,
    "host": process.env.HOST,
    "dialect": "mysql"
  }
}
