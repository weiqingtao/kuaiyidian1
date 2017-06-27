var router = require('koa-router')();
var ShopUserModel = require('../models/ShopUserModel');
var MenuModel = require('../models/MenuModel');
var DishModel = require('../models/DishModel');
var formidable = require('formidable');
var sequelize =require('../models/ModelHeader')();

router.get('/', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  if(typeof(loginbean.shoprole)!='undefined'&&loginbean.shoprole==0){
  	  ctx.state = {
	    loginbean: loginbean,
	  };
	  let rs = await ShopUserModel.findAll({where:{shopid:loginbean.shopid}});
	  await ctx.render('shop/shopIndex', {rs:rs});
  }else{
  	ctx.redirect('/');
  }
  
})

router.post('/login', async function (ctx, next) {
  	  let rs = await ShopUserModel.findOne({where:{email:ctx.request.body.email,pwd:ctx.request.body.pwd}});
  	  // console.log('rs=');
  	  // console.log(rs);
  	  if(rs){
  	  	  let loginbean = new Object();
		  loginbean.id = rs.id;
		  loginbean.nicheng = rs.nicheng;
		  loginbean.shoprole = rs.role;
		  loginbean.shopid = rs.shopid;
		  ctx.session.loginbean=loginbean;
		  //ctx.body='登陆成功';
		  ctx.redirect('./');
  	  }else{
  	  	  ctx.body='账号/密码错误';
  	  }
	  
			
	  // await ctx.render('index', {
	  // });
})

router.post('/mobileLogin', async function (ctx, next) {
  	  let rs = await ShopUserModel.findOne({where:{email:ctx.request.body.email,pwd:ctx.request.body.pwd}});
  	  if(rs){
  	  	  let sql = 'select shopname from shops where id=?';
		  let shopRs = await sequelize.query(sql,{replacements: [rs.shopid]});
  	  	  let loginbean = new Object();
		  loginbean.id = rs.id;
		  loginbean.nicheng = rs.nicheng;
		  loginbean.shoprole = rs.role;
		  loginbean.shopid = rs.shopid;
		  loginbean.shopname = shopRs[0][0].shopname;
		  ctx.session.loginbean=loginbean;
		  ctx.body="1,"+loginbean.shopname+','+loginbean.shoprole;
		  //ctx.redirect('./');
  	  }else{
  	  	  ctx.body="0,";
  	  }
	  
			
	  // await ctx.render('index', {
	  // });
})

router.post('/addClerk', async function (ctx, next) {
	let loginbean = ctx.session.loginbean;
  	if((typeof(loginbean.shoprole)!='undefined')&&loginbean.shoprole==0){
		try{
			ctx.request.body.shopid=loginbean.shopid;
			let creaters = await ShopUserModel.create(ctx.request.body);
			ctx.redirect('./');
		}catch(err){
			if(err.errors[0].path=='shopemailuniq'){
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
  		let rs = await MenuModel.findAll({where:{shopid:loginbean.shopid}});
  		await ctx.render('shop/menu', {rs:rs});
  	}
})

router.get('/getMenu', async function (ctx, next) {
	let loginbean = ctx.session.loginbean;
	if((typeof(loginbean.shoprole)!='undefined')){
  		let menuRs = await MenuModel.findAll({where:{shopid:loginbean.shopid}});
  		let menuId = menuRs[0].id;
  		let dishRs = await DishModel.findAll({where:{menuid:menuId}});
  		ctx.body=[menuRs,dishRs];
  	}
})


router.post('/addMenu', async function (ctx, next) {
	let loginbean = ctx.session.loginbean;
	ctx.state = {
	    loginbean: loginbean,
	  };a
  	if((typeof(loginbean.shoprole)!='undefined')&&loginbean.shoprole==0){
  		ctx.request.body.shopid=loginbean.shopid;
  		let creaters = await MenuModel.create(ctx.request.body);

  		ctx.redirect('./menu');
  	}
})


router.get('/dishes', async function (ctx, next) {
	// ctx.response.setHeader("Pragma","No-cache");
	// ctx.response.setHeader("Cache-Control","no-cache");
	// ctx.response.setDateHeader("Expires", -10);
	let loginbean = ctx.session.loginbean;
	if(loginbean.shoprole==0){
		//接参
		let id = ctx.query['id'];	//菜单分类id 
		let rs = await DishModel.findAll({where:{menuid:id,shopid:loginbean.shopid}});
		await ctx.render('shop/dishmanage', {dishRs:rs});
	}else{
		ctx.body='你无权查看';
	}
	
})


router.post('/addDish', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  if(loginbean.shoprole==0){
  	let form = new formidable.IncomingForm();   //创建上传表单
	  form.encoding = 'utf-8';        //设置编辑
	  form.uploadDir = './public/images/dishphoto/';     //设置上传目录 文件会自动保存在这里
	  form.keepExtensions = true;     //保留后缀
	  form.maxFieldsSize = 5 * 1024 * 1024 ;   //文件大小5M
	  let fields = await new Promise(async function(resolve,reject){
	  		form.parse(ctx.req, function (err, fields, files) {
		        if(err){
		            console.log(err);
		        }
		        if(files.dishphoto){
		        	fields.dishphoto=files.dishphoto.path.replace('public','');
		        }else{
		        	fields.dishphoto=''; //默认图片
		        }
		        
		        resolve(fields);
		   })
	  })
	  fields.shopid=loginbean.shopid;
	  try{
		  let creaters = await DishModel.create(fields);
		  let updrs = await MenuModel.update({num:sequelize.literal('num+1')},{where:{'id':fields.menuid}});
		  ctx.body=0;
	  }catch(err){
	  	  console.log(err);
	  	  ctx.body=1;
	  }
  }	
  
})


router.post('/updDish', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  if(loginbean.shoprole==0){
  	let form = new formidable.IncomingForm();   //创建上传表单
	  form.encoding = 'utf-8';        //设置编辑
	  form.uploadDir = './public/images/dishphoto/';     //设置上传目录 文件会自动保存在这里
	  form.keepExtensions = true;     //保留后缀
	  form.maxFieldsSize = 5 * 1024 * 1024 ;   //文件大小5M
	  let fields = await new Promise(async function(resolve,reject){
	  		form.parse(ctx.req, function (err, fields, files) {
		        if(err){
		            console.log(err);
		        }
		        let updObj;
		        console.log(files.dishphoto);
		        if(files.dishphoto){
		        	console.log('有图');
		        	updObj={
		        		dishname:fields.dishname,
		        		price:fields.price,
		        		dishphoto:files.dishphoto.path.replace('public',''),
		        		dishid:fields.dishid
		        	};
		        }else{
		        	console.log('无图');
		        	updObj={
		        		dishname:fields.dishname,
		        		price:fields.price,
		        		dishid:fields.dishid
		        	};
		        }
		        resolve(updObj);
		   })
	  })
	  fields.shopid=loginbean.shopid;
	  try{
		  let updrs = await DishModel.update(fields,{where:{'id':fields.dishid}});
		  ctx.body=0;
	  }catch(err){
	  	  console.log(err);
	  	  ctx.body=1;
	  }
  }	
  
})


router.get('/delDish', async function (ctx, next) {
	
	let loginbean = ctx.session.loginbean;
	let dishid = ctx.query.dishid;
	let menuid = ctx.query.menuid;
	let sql = 'delete from dishes where id=? and shopid=?';
	let delrs = await sequelize.query(sql,{replacements: [dishid,loginbean.shopid],type: sequelize.QueryTypes.DELETE});
	sql = 'update menus set num=num-1 where id=? and shopid=?';
	let updrs = await sequelize.query(sql,{replacements: [menuid,loginbean.shopid],type: sequelize.QueryTypes.UPDATE});
	ctx.body=1;
})


router.get('/downsale', async function (ctx, next) {
	let loginbean = ctx.session.loginbean;
	let dishid = ctx.query.dishid;
	let sql = 'update dishes set putaway=0 where id=? ';
	let updrs = await sequelize.query(sql,{replacements: [dishid],type: sequelize.QueryTypes.UPDATE});
	ctx.body=1;
})

router.get('/logout', async function (ctx, next) {
	let loginbean = ctx.session.loginbean;
	
	delete ctx.session.loginbean;
	ctx.body=1;
})

module.exports = router;
