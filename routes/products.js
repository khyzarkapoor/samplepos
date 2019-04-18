const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//add new
router.post('/add', passport.authenticate('jwt',{session:false}), (req, res)=>{
    let newProduct = new Product({
        name: req.body.name,
        category:req.body.category,
        baseprice:req.body.baseprice,
        quantity:req.body.quantity,
        createdby:req.user._id
    });
    newProduct.save((err,product)=>{
        if(err){
            res.json(
                {
                    success:false,
                    error:"Failed to add product."+err
                }
            );
        }else{
            res.json(
                {
                    success:true, 
                    msg:"Product added"
                }
            );
        }
    });
});

// edit existing product via _id
router.put("/edit",passport.authenticate('jwt',{session:false}),(req,res)=>{
    let product = {
        id:req.body.id,
        name:req.body.name,
        category:req.body.category,
        baseprice:req.body.baseprice,
        quantity:req.body.quantity
    };
    Product.findOneAndUpdate(
        {
            _id:product.id
        },
        {
            name:product.name,
            category:product.category,
            baseprice:product.baseprice,
            quantity:product.quantity
        },
        {
            new:true
        },
        (err,doc)=>{
            if(err){
                res.json({
                    success:false,
                    error:err
                })
            }else{
                res.json({
                    success:true,
                    data:doc
                });
            }
        }
    )

});

// remove existing product via _id
router.delete("/remove/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{
    let id = req.params.id;

    Product.findOneAndRemove(
        {
            _id:id
        },
        (err,resp)=>{
            if(err){
                res.json({
                    success:false,
                    error:err
                })
            }else{
                res.json({
                    success:true,
                    data:resp
                })
            }
        }
    )
})

// get all products
router.get("/all",passport.authenticate('jwt',{session:false}),(req,res)=>{
    Product.find(
        {},
        (err,docs)=>{
            if(err){
                res.json({
                    success:false,
                    error:err
                })
            }else{
                res.json({
                    success:true,
                    data:docs
                })
            }
        }
    )
});

// get all products by category
router.get("/all/category/:category",passport.authenticate('jwt',{session:false}),(req,res)=>{
    let category = req.params.category;
    Product.find(
        {
            category:category
        },
        (err,docs)=>{
            if(err){
                res.json({
                    success:false,
                    error:err
                })
            }else{
                res.json({
                    success:true,
                    data:docs
                })
            }
        }
    )
});

// get single product via _id
router.get("/unit/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{
    let id = req.params.id;

    Product.findOne(
        {
            _id:id
        },
        (err,doc)=>{
            if(err){
                res.json({
                    success:false,
                    error:"Not found."
                })
            }else{
                res.json({
                    success:true,
                    data:doc
                })
            }
        }
    )
});


//export
module.exports = router;