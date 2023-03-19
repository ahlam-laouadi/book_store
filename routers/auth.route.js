const route=require('express').Router()
const Authcontroller=require('../controllers/auth.controller')
const body=require('express').urlencoded({extended:true})

const guardAuth=require('./guardAuth')

route.get('/register',guardAuth.notAuth,Authcontroller.registerController)
route.post('/register',body,Authcontroller.postRegisterData)

route.get('/login',guardAuth.notAuth,Authcontroller.getLoginPage)
route.post('/login',body,Authcontroller.postLoginData)
route.post('/logout',Authcontroller.logout)

module.exports=route