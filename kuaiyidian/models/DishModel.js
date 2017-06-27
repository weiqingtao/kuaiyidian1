var Sequelize = require('sequelize'); 
var sequelize =require('./ModelHeader')();


var DishModel = sequelize.define('dishes', {
	id: {type:Sequelize.BIGINT,primaryKey: true},
    shopid: Sequelize.BIGINT,
    menuid: Sequelize.BIGINT,
    dishname: Sequelize.STRING,
    price: Sequelize.DECIMAL,
    dishphoto: Sequelize.STRING,
    putaway: Sequelize.INTEGER,
    keywords: Sequelize.STRING,
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
	});

module.exports = DishModel;