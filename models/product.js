const mongoose = require('mongoose');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

//user schema
const ProductSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    baseprice:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    createdby:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default: moment.utc().add(5,'hours').toDate()
    }
});

//to get this function from outside, export it.
const Product = module.exports = mongoose.model('Product',ProductSchema);






