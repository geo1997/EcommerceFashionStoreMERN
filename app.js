const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const path = require('path');


require('dotenv').config();

//require routes
const authenticationRoutes = require('./routes/authentication');
const productRoutes = require("./routes/product");
const checkoutRoutes = require('./routes/checkout');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');
const ratingRoutes = require('./routes/rating');

//app
const app  = express();

//db
mongoose.connect(process.env.MONGODB_URI , {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify: false
}).then(() => console.log("Database connected"));

//middlewares
app.use(morgan('dev')); //HTTP request logger
app.use(bodyParser.json()); //converts POST data to JSON
app.use(cookieParser()); //Parses cookies attached to client request object
app.use(expressValidator()); //Server side validation
app.use(cors());

//routes
app.use("/api",authenticationRoutes);
app.use("/api",productRoutes);
app.use("/api",checkoutRoutes);
app.use("/api",orderRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",commentRoutes);
app.use("/api",likeRoutes);
app.use("/api",ratingRoutes);

const port = process.env.PORT || 8000;


if(process.env.NODE_ENV){
    app.use(express.static('./frontend/build'))

    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, './frontend/build/index.html'), function(err) {
            if (err) {
                res.status(500).send(err)
            }
        })
    })

}

app.listen(port, () =>{
    console.log(`Server running on ${port}`);
});
