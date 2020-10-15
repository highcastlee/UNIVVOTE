'use strict';

const Sequelize = require('sequelize');

module.exports = class Major extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            majorId:{
                type:Sequelize.INTEGER,
                allowNull:false,
                unique:true,
            },
            majorName:{
                type:Sequelize.STRING(45),
                allowNull:false,
            },
            voteCount:{
                type:Sequelize.INTEGER,
                allowNull:false,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Major',
            tableName:'majorinfo',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    };
    static associate(db){};
};