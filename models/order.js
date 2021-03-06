const mongoose = require('mongoose');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

//user schema
const OrderSchema = mongoose.Schema({
    order:[{
        productid:String,
        quantity:Number,
        price:Number
    }],
    orderamount:{
        type:Number,
        required:true
    },
    createdby:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default: () =>  moment(Date.now()).utcOffset('+0500').format('YYYY-MM-DD HH:mm:ss')
    }
});

//to get this function from outside, export it.
const Order = module.exports = mongoose.model('Order',OrderSchema);






