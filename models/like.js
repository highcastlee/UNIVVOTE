'use strict';

const Sequelize = require('sequelize');

module.exports = class Like extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            likeId:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
            },
            position:{
                type:Sequelize.STRING(10),
                allowNull:false,
            },
            sum:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Like',
            tableName:'likes',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    };
    static associate(db){
        db.Like.belongsToMany(db.User, {through:'UserLike'});
    };
};