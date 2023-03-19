const mongoose=require('mongoose')

var schemabook=mongoose.Schema({
    id:String,
    title:String,
    description:String,
    author:String,
    price:Number,
    image:String,
    userId:String
})
var Book=mongoose.model('book',schemabook)
var url='mongodb://localhost:27017/library'

exports.getallbooks=()=>{
return new Promise((resolve,reject)=>{
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
      return   Book.find({})
     
}).then(books=>{
    mongoose.disconnect()
    resolve(books)
}).catch(err=>reject(err))
})
}
exports.getonebook=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return   Book.find({}).limit(1)
    }).then(books=>{
        mongoose.disconnect()
        resolve(books)
    }).catch(err=>reject(err))
})
}
    
exports.getbook=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return   Book.findById(id)
    }).then(books=>{
        mongoose.disconnect()
        resolve(books)
    }).catch(err=>reject(err))
})
}
exports.postDataBookModel=(title,description,author,price,image,userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

            let book=new Book({
                title:title,
                description:description,
                author:author,
                price:price,
                image:image,
                userId:userId
            })
           return book.save()


        }).then(()=>{
            mongoose.disconnect()
            resolve('added!')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
 }   
 exports.getMyBooks=(userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return   Book.find({userId:userId})
         
    }).then(books=>{
        mongoose.disconnect()
        resolve(books)
    }).catch(err=>reject(err))
    })
 }    
 exports.deletebook=(id)=>{
    return new Promise((resolve,reject)=>{
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Book.deleteOne({_id:id})
   
       }).then(books=>{
           mongoose.disconnect()
           resolve(true)
   
       }).catch(err=>reject(err))
    })
 }
 exports.getPageUpdateBookModel=(id)=>{
    return new Promise((resolve,reject)=>{
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Book.findById(id)
       }).then(books=>{
           mongoose.disconnect()
           resolve(books)
       }).catch(err=>reject(err))
    })
 }
 exports.postUpdateBookModel=(bookId,title,description,author,price,filename,userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Book.updateOne({_id:bookId},{title:title,description:description,author:author,image:filename,price:price,userId:userId})
        }).then(()=>{
            mongoose.disconnect()
            resolve('Updated!')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })

} 
mongoose.set('strictQuery', true);