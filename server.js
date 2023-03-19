const express=require('express')
const path=require('path')
const routerHome=require('./routers/home.route')
const routerBooks=require('./routers/book.route')
const routerAuth=require('./routers/auth.route')
const routeContact=require('./routers/contact.route')
const routeAbout=require('./routers/about.route')
const session=require('express-session')
const MongoDbStore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')
const routerMyBooks=require('./routers/mybooks.route')
const app=express()

app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')
var Store=new MongoDbStore({
    uri:'',
    collection:"sessions"
})
app.use(flash())
app.use(session({
    secret:'this is my secret key jhgjggn',
    Store:Store,
    resave:true,
    saveUninitialized:true
}))
app.use('/',routerHome)
app.get('/contact',routeContact)
app.get('/about',routeAbout)
app.use('/books',routerBooks)
app.use('/',routerAuth)
app.get('/mybook',(req,res,next)=>{
    res.render('mybook',{verifUser:req.session.userId})
})
app.use('/mybooks',routerMyBooks)
app.listen(8080,()=>{console.log('server run on port 8080')})
