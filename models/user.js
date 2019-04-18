const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

//user schema
const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default: () =>  moment(Date.now()).utcOffset('+0500').format('YYYY-MM-DD HH:mm:ss')
    },
});

//to get this function from outside, export it.
const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function(id,callback){
    User.findOne(
        {
            _id:id
        },
        (err,doc)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,doc);
            }
        }
    )
}

module.exports.getUserByEmail = function(email,callback){
    User.findOne(
        {
            email:email
        },
        (err,doc)=>{
            if(err){
                callback(err,null);
            }
            callback(null,doc);
        }
    )
}

// this method will hash the user's passwor.
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err){
                throw err;
            }else{
                newUser.password = hash;
                newUser.save(callback);
            }
        });
    });
}

// this method will compare the given password to its hash
module.exports.comparePassword = function(password,hash,callback){
    bcrypt.compare(password,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    });
}







