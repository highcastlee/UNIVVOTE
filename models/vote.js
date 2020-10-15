'use strict';

const Sequelize = require('sequelize');

module.exports = class Vote extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            candidate_01:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
            },
            candidate_02:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Vote',
            tableName:'voteInfo',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    };
    static associate(db){};
};