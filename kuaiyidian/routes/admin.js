var router = require('koa-router')();
var Users = require('../models/UserModel');
var ShopModel = require('../models/ShopModel');
var formidable = require('formidable');
var sequelize =require('../models/ModelHeader')(); 
var ShopUserModel = require('../models/ShopUserModel');

router.get('/', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  if(loginbean.adminrole){
  	//--------查询shop------------------------
  	let sql = 'select id,shopname from shops order by id desc';
  	let rs = await sequelize.query(sql);
  	await ctx.render('admin/adminIndex', {rs:rs[0]});
  }else{
  	ctx.redirect('/adminLogin.html');
  }
  
});

router.post('/login', async function (ctx, next) {
	let rs = await new Promise(function(resolve,reject){
		Users.findOne({where:{email:ctx.request.body.email,pwd:ctx.request.body.pwd}}).then(function(rs){
			if(rs!=null){
				let loginbean=new Object();
				loginbean.id = rs.id;
				loginbean.nicheng = rs.nicheng;
				loginbean.adminrole = rs.role;
				loginbean.msgnum = rs.msgnum;
				ctx.session.loginbean=loginbean;
				//ctx.redirect('/admin/index');
				resolve(1);
			}else{
				resolve(2);
			}
		});
	})
	if(rs==1){
		ctx.redirect('./');
		//ctx.body='登陆成功';
	}else{
		ctx.body='email/密码错误';
	}
  	
})


router.post('/createShop', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;

  let form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = './public/images/shopphoto/';     //设置上传目录 文件会自动保存在这里
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 5 * 1024 * 1024 ;   //文件大小5M
  let fields = await new Promise(async function(resolve,reject){
  		form.parse(ctx.req, function (err, fields, files) {
	        if(err){
	            console.log(err);
	        }
	        fields.photourl=files.photourl.path.replace('public','');
	        resolve(fields);
	   })
  })
  fields.createtime=new Date();
  //----------事物处理-----------------------
  let t = await sequelize.transaction();
  try{
		let creaters = await ShopModel.create(fields, {transaction: t});
		fields.shopid=creaters.null;
		fields.nicheng=fields.shopname;
		let shopuserRs = await ShopUserModel.create(fields, {transaction: t});
		t.commit();
   }catch(err){
		//console.log(err);
		t.rollback();
		if(err.errors[0].path=='shopemailuniq'){
			ctx.body='账号重复';
		}else{
			ctx.body = '数据库错误';
		}
		
		return;
   }

  	ctx.body='商店创建成功';
  

  // try{
  // 	let creaters = await ShopModel.create(fields);
  // 	console.log(creaters);
  // 	console.log('返回id:'+creaters.null);
  // }catch(err){
		// console.log(err.errors[0].message); //识别唯一键
  // }
  


  
  
})

module.exports = router;
