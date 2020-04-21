const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
var cors = require('cors');

require('dotenv').config();

//require routes
const authenticationRoutes = require('./routes/authentication');
const productRoutes = require("./routes/product");

const braintreeRoutes = require('./routes/braintree');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');

//app
const app  = express();

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(() => console.log("Database connected"));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes
app.use("/api",authenticationRoutes);
app.use("/api",productRoutes);
app.use("/api",braintreeRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () =>{
    console.log(`Server running on ${port}`);
});