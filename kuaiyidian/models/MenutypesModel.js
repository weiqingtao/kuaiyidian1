var Sequelize = require('sequelize'); 
var sequelize =require('./ModelHeader')();

var MenutypesModel = sequelize.define('menutypes', {
    id: {type:Sequelize.BIGINT,primaryKey: true},
    shopid: Sequelize.BIGINT,
    typename:Sequelize.STRING,
    num:Sequelize.INTEGER
},{
        timestamps: false,
        //paranoid: true  //获取不到id的返回值
    });

module.exports = MenutypesModel;