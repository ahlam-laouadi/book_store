const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

var schemaAuth=mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
})
var User=mongoose.model('user',schemaAuth)
var url='mongodb://localhost:27017/library'

exports.registerModel=(name,email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return  User.findOne({Email:email})
        }).then((user)=>{
            if(user){
            mongoose.disconnect()
                reject('email is used')
            }else{
        return  bcrypt.hash(password,10)
            }
            
        }).then((hpassword)=>{
        let user=new User({
            Name:name,
            Email:email,
            Password:hpassword
        })
       return user.save()
        }).then((user)=>{
            mongoose.disconnect()
            resolve('registred!')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
})
}
exports.loginFunction=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return  User.findOne({Email:email})
        }).then((user)=>{
             if(user){
                bcrypt.compare(password,user.Password).then((verif)=>{
                   if(verif){
                       mongoose.disconnect()
                       resolve(user._id)
                   }else{
                    mongoose.disconnect()
                    reject('invalide password!')
                   }
                })
             }else{
                mongoose.disconnect()
                reject('we dont have this user in our database!')
             }
        }).catch(()=>{
            reject(err)
})
})
}