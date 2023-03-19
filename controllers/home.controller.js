const HomeModel=require('../models/book.model')

exports.onebook=(req,res,next)=>{
  HomeModel.getonebook().then(books=>{
      res.render('index',{books:books,verifUser:req.session.userId})
  })
}