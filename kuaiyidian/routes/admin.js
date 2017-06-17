const router = require('koa-router')()
var Users = require('../models/UserModel');
var ShopModel = require('../models/ShopModel');
var ShopUserModel = require('../models/ShopUserModel');
var sequelize =require('../models/ModelHeader')();
var formidable = require('formidable');
const multer = require('koa-multer');//加载koa-multer模块  
router.prefix('/admin')

router.get('/', async (ctx, next) => {
	let loginbean = ctx.session.loginbean;
	if(loginbean){
		await ctx.render("admin/adminIndex");
	}else{
		ctx.redirect('/adminLogin.html');
	}
	
});




//登录管理员
router.post('/login', async (ctx, next) => {
	let result=await new Promise(function (resolve,reject){
   Users.findOne({where:{email:ctx.request.body.email,pwd:ctx.request.body.pwd}}).then(function(rs){
		if(rs!=null){
		let  loginbean=new Object();
			loginbean.nicheng = rs.nicheng;
			loginbean.role = rs.role;
		    loginbean.msgnum = rs.msgnum;
		ctx.session.loginbean=loginbean;
			//ctx.redirect(req.body.url);
			resolve(1);
		}else{
			resolve(2);
			
		}
	});
});
   if(result==1){
   	//ctx.body="登陆成功！"
   	ctx.redirect("./");
   }else{
   		ctx.body="email/密码错误！"
  }
})


router.post('/pubShop', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;

  let form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = './public/images/shop/';     //设置上传目录 文件会自动保存在这里
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
		if(err.errors[0].path=='emailuniq'){
			ctx.body='账号重复';
		}else{
			ctx.body = '数据库错误';
		}
		
		return;
   }

  	ctx.body='商店创建成功';
})
              


router.get('/manage', async (ctx, next) => {
	let a = null;
	 let rs = await new Promise(function(resolve,reject){
	 	
  		let loginbean = ctx.session.loginbean;
	  	sequelize.query('select * from shops').then(function(shopRs){
	  		 a = shopRs;
	  		if(shopRs!=null){
					resolve(1);
				}else{
	                resolve(2); 
				}
	  		
	  		
	  	});
	  })
	 if(rs==1){
	 	console.log(a);
		await	ctx.render("admin/manageShop", {rs:a[0]});
			}else{
		    ctx.body='添加失败'
		}
	
})


		router.get('/deleteShop', async (ctx, next) => {
			let result=await new Promise(function (resolve,reject){
		 let id = ctx.request.query.id;
		  let sql = 'delete from shops where id = ?';
		  sequelize.query(sql,{replacements:[id]}).then(function(rs){   
		      if(rs!=null){
				resolve(1);
				}else{
				resolve(2);
					
				}
				    })
				  })
			if(result==1){
   			ctx.body="删除成功"
   			ctx.redirect("./");
		}else{
			ctx.body="删除失败"
		}
			 		})
module.exports = router





          

       