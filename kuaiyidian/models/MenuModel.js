var Sequelize = require('sequelize'); 
var sequelize =require('./ModelHeader')();

var MenuModel = sequelize.define('menus', {
	id: {type:Sequelize.BIGINT,primaryKey: true},
    shopid: Sequelize.BIGINT,
    typename:Sequelize.STRING,
    num:Sequelize.INTEGER
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
	});

module.exports = MenuModel;