const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const asyncLoop = require('node-async-loop');
var AsyncLock = require('async-lock');
var lock = new AsyncLock();

//add new
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {


    lock.acquire("verify", function (done) {
        console.log("lock enter");
        // get the order details 
        // let orderdetails = [
        //     {
        //         productid: "5cb4408c2655652a280ebfa1",
        //         quantity: 1,
        //         price: 10
        //     },
        //     {
        //         productid: "5cb441135906b12af48158c7",
        //         quantity: 1,
        //         price: 10
        //     }
        // ];
        let orderdetails = JSON.parse(req.body.orderdetails);
        let orderamount = req.body.orderamount;

        let unverifiedproducts = [];
        let verifiedproducts = [];

        asyncLoop(
            orderdetails,
            (item, next) => {
                Product.findById
                    (
                    item.productid,
                    (err, product) => {
                        if (err) {
                            next(err);
                        } else {
                            if (item.quantity <= product.quantity && item.quantity > 0) {
                                if(item.price == product.baseprice){
                                    verifiedproducts.push({ productid: item.productid, askedq: item.quantity, remainingq: product.quantity, askedp:item.price, originalp:product.baseprice });
                                }else{
                                    unverifiedproducts.push({ productid: item.productid, askedq: item.quantity, remainingq: product.quantity, askedp:item.price, originalp:product.baseprice  });
                                }
                            } else {
                                unverifiedproducts.push({ productid: item.productid, askedq: item.quantity, remainingq: product.quantity, askedp:item.price, originalp:product.baseprice  });
                            }
                            next();
                        }
                    }
                    )
            },
            (err) => {
                if (err) {
                    console.log("ERROR: ", err);
                }

                console.log("All iterations have finished");
                

                if (unverifiedproducts.length > 0) {
                    res.json({
                        success: false,
                        error: "Product details invalid.",
                        errordetails:unverifiedproducts
                    })
                } else if (verifiedproducts.length == orderdetails.length) {

                    // now decrease the product quantities

                    asyncLoop(
                        orderdetails,
                        (item2,next2)=>{
                            Product.findOneAndUpdate(
                                {
                                    _id:item2.productid
                                },
                                {
                                    $inc : {
                                        quantity : -item2.quantity
                                    }
                                },
                                {new:true},
                                (err,resp)=>{
                                    if(err){
                                        next2(err);
                                    }
                                    next2();
                                }
                            )
                        },
                        (err)=>{
                            if(err){
                                throw err;
                            }

                            console.log("All subtractions have finished");

                            let newOrder = new Order({
                                order:orderdetails,
                                orderamount:orderamount,
                                createdby:req.user._id
                            });
                            newOrder.save(function(err,resp){
                                if(err){
                                    res.json({
                                        success:false,
                                        error:err
                                    })
                                }else{
                                    res.json({
                                        success: true,
                                        msg: "Order Added" 
                                    })
                                }
                            });

                        }
                    )
                }
                done();
            }
        );

    }, function (err, ret) {
        console.log("lock released")
    }, {});




});

// get all orders in descending order
router.get("/all", passport.authenticate('jwt', { session: false }), (req, res) => {
    Order.find(
        {},
        null,
        {
            sort :{
                created:-1
            }
        },
        (err, docs) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                })
            } else {
                res.json({
                    success: true,
                    data: docs
                })
            }
        }
    )
});

//export
module.exports = router;