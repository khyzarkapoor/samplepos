const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
var CryptoJS = require("crypto-js");


//register
router.post('/register', (req, res, next)=>{
    let newUser = new User({
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    });
    User.addUser(newUser, (err,user)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user."});
        }else{
            res.json({success:true, msg:"User registered"});
        }
    });
});


//authenticate
router.post('/authenticate', (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err,user)=>{
        if(err){
            res.json({
                success:false,
                error:err
            });
        }
        if(!user){
            return res.json({success:false, error:'user not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) {
                res.json({
                    success:false,
                    error:err
                });
            }
            if(isMatch){
                //create token
                const token = jwt.sign(user.toJSON(),config.secret,{
                    expiresIn:86400 //1 day
                });
                res.json({
                    success:true,
                    token:'bearer '+token
                });
            }else{
                return res.json({success:false, error:'wrong email/password'});
            }
        });
    });
});

//profile protected route
router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res)=>{
    res.json({
        success:true,
        name:req.user.name,
        email:req.user.email,
        phone:req.user.phone,
        created:req.user.created
    });
});

//export
module.exports = router;