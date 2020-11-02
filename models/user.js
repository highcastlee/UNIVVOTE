'use strict';

const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userId:{
                type:Sequelize.INTEGER,
                allowNull:false,
                unique:true,
            },
            isVoted:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isCommented:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked1:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked2:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked3:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked4:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked5:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked6:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            created_at:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'User',
            tableName:'users',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    static associate(db){
        db.User.hasMany(db.Comment,{foreignKey:'commenter',sourceKey:'userId'});
    }
};