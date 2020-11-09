'use strict';

const Sequelize = require('sequelize');
//SQL model 파일을 의미함 ./models/user.js를 가리킴
const User = require('./user');
const Comment = require('./comment');
const Vote = require('./vote');
const Major = require('./major');
const Like = require('./like');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')['production'];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;
db.Vote = Vote;
db.Major = Major;
db.Like = Like;

User.init(sequelize);
Comment.init(sequelize);
Vote.init(sequelize);
Major.init(sequelize);
Like.init(sequelize);

User.associate(db);
Comment.associate(db);
Vote.associate(db);
Major.associate(db);
Like.associate(db);

module.exports = db;
