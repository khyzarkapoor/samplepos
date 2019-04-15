//------------------------------------- require -------------------------
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

//---------------------------- mongoose ---------------------------------
//mongodb connection
mongoose.connect(config.database);

//check if connected
mongoose.connection.on('connected',()=>{
    console.log("Connected to DB " + config.database);
});

//check if db error
mongoose.connection.on('error',(err)=>{
    console.log("DB error " + err);
});
//-----------------------------------------------------------------------

//start express 
const app = express();

//the router file for users
const users = require('./routes/users');

//the router file for products
const products = require('./routes/products');

//the router file for orders
const orders = require('./routes/orders');

//port
const port = process.env.PORT || 3000;

app.use(cors({credentials: true, origin: '*'}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });

app.use(express.static(path.join(__dirname,'public'),{maxAge:'1d'}));

app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//routes file
app.use('/users', users);
app.use('/products', products); 
app.use('/orders', orders); 

// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, '/public', 'index.html'));
// });

app.get("/",function(req,res){
    res.end("SamplePOS Homepage.")
});

app.get('*',function(req,res){
    res.send(
        "<h3>404 Page Not found</h3><br/>"+
        "<a href='/'>SamplePOS Homepage</a>"
    )
    res.end("404 Page Not Found.")
})

//create server
app.listen(port,()=>{
    console.log("Server started on port "+port);
})
