const AuthModel=require('../models/auth.model')

exports.registerController=(req,res,next)=>{
      res.render('register',{verifUser:req.session.userId,message:req.flash('error')[0]})

}
exports.postRegisterData=(req,res,next)=>{
    AuthModel.registerModel(req.body.name,req.body.email,req.body.password).then((user)=>{
        res.render('login')
    }).catch((err)=>{
      req.flash('error',err)
      res.redirect('/register')
    })
}
exports.getLoginPage=(req,res,next)=>{
  res.render('login',{verifUser:req.session.userId,message:req.flash('error')[0]})

}
exports.postLoginData=(req,res,next)=>{
  AuthModel.loginFunction(req.body.email,req.body.password).then((id)=>{
    req.session.userId=id
    res.redirect('/')
  }).catch((err)=>{
    req.flash('error',err)
    res.redirect('/login')
  })
}
exports.logout=(req,res,next)=>{
  req.session.destroy(()=>{
     res.redirect('/login')
  })
}