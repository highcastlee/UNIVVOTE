'use strict';

const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userId:{
                type:Sequelize.STRING(150),
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
            isLiked7:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked8:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked9:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked10:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked11:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked12:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked13:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked14:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked15:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked16:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked17:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked18:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked19:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked20:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked21:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked22:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked23:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked24:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked25:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked26:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked27:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked28:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked29:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked30:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked31:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked32:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked33:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked34:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked35:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,
            },
            isLiked36:{
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