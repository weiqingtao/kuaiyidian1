const router = require('koa-router')()
var ShopUserModel = require('../models/ShopUserModel');
var sequelize =require('../models/ModelHeader')();
var MenutypesModel = require('../models/MenutypesModel');
router.prefix('/shop')

router.get('/', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  	if((typeof(loginbean.shoprole)!='undefined')&&loginbean.shoprole==0){
  	  ctx.state = {
	    loginbean: loginbean,
	  };
	  let shopuserRs = await ShopUserModel.findAll({where:{shopid:loginbean.shopid}});
	  await ctx.render('shop/shopIndex', {shopuserRs:shopuserRs});
  }else{
  	ctx.redirect('/');
  }
})


//商家登录
router.post('/login', async function (ctx, next) {
     let rs = await ShopUserModel.findOne({where:{email:ctx.request.body.email,pwd:ctx.request.body.pwd}}).then(function(rs){
		if(rs!=null){
		let  loginbean=new Object();
			loginbean.nicheng = rs.nicheng;
			loginbean.shoprole = rs.role;
		    loginbean.msgnum = rs.msgnum;
		    loginbean.shopid = rs.id;
			ctx.session.loginbean=loginbean;
			//ctx.redirect(req.body.url);
				ctx.redirect("./");
		}else{
			ctx.body="登录失败"
			
		}
	});
})
//创建店员
router.post('/addClerk', async function (ctx, next) {
	let loginbean = ctx.session.loginbean;
  	if((typeof(loginbean.shoprole)!='undefined')&&loginbean.shoprole==0){
		try{
			ctx.request.body.shopid=loginbean.shopid;
			let creaters = await ShopUserModel.create(ctx.request.body);
			ctx.redirect('./');
		}catch(err){
			if(err.errors[0].path=='emailuniq'){
				ctx.body='账号重复';
			}else{
				ctx.body = '数据库错误';
			}
		}
	}else{
		ctx.redirect('/');
	}
	
})

	router.get('/menu', async function (ctx, next) {
	let loginbean = ctx.session.loginbean;
	ctx.state = {
	    loginbean: loginbean,
	  };
  	if((typeof(loginbean.shoprole)!='undefined')&&loginbean.shoprole==0){
  		let rs = await MenutypesModel.findAll({where:{shopid:loginbean.shopid}});
  		await ctx.render('shop/menu', {rs:rs});
  	}
})
	router.post('/addMenu', async function (ctx, next) {
	let loginbean = ctx.session.loginbean;
	ctx.state = {
	    loginbean: loginbean,
	  };
  	if((typeof(loginbean.shoprole)!='undefined')&&loginbean.shoprole==0){
  		ctx.request.body.shopid=loginbean.shopid;
  		let creaters = await MenutypesModel.create(ctx.request.body);
  		ctx.redirect('./menu');
  	}
})
module.exports = router;

