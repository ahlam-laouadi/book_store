const route=require('./auth.route')
const BookController=require('../controllers/book.controller')
const router=require('express').Router()
const GuardAuth=require('./guardAuth')
const multer=require('multer')

router.get('/',GuardAuth.isAuth,BookController.allbooks)
router.get('/:id',GuardAuth.isAuth,BookController.getbookdetails)
route.get('/addbook',GuardAuth.isAuth,BookController.getAddBookController)
route.post('/addBook',multer({
storage:multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'assets/uploads')
        },
        filename:function (req, file, cb) {
            cb(null, Date.now()+ ' ' + file.originalname)
          }
    })
}).single(['image']),GuardAuth.isAuth,BookController.postbook)


module.exports=router
