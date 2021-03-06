const Category = require('../models/category');
const {errorHandler} = require("../helpers/ErrorHandler");

//Add new category
exports.addCategory = (req,res)=>{
    const newCat = new Category(req.body);
    newCat.save((err,content) =>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json({content});
    });
};

//Find category based on the id
exports.findCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((error,category) => {
        if (error || !category) {
            return res.status(400).json({
                error: 'Category not found'
            });
        }
        req.productCat = category; //When found add to the request object
        next();
    });
};

//Get a particular category
exports.contentRead = (req, res) => {
    return res.json(req.productCat);
};

//Update a particular category
exports.updateCategory = (req, res) => {
    const cat = req.productCat
    cat.categoryName = req.body.categoryName
    cat.save((error, content) => {
        if(error){
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(content);
    });
};

//Delete a particular category
exports.deleteCategory = (req, res) => {
    const  cat = req.productCat
    cat.remove((error) => {
        if(error){
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json({
            message : 'Category deleted'
        });
    });
};

exports.listCategories = (req, res) => {
    Category.find().exec((error, content) => {
        if(error){
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(content);
    });
};
