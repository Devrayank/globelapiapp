
const mongoose = require("mongoose");
const Pro = require("../model/product");
const ObjectId = require('mongodb').ObjectId; 

const getproducts = async (req, res) => {
    Pro.find()
    .then(result => {
     res.status(200).json({
         status:true,
         message:'sucess',
         ProductData:result
     });
    })
    .catch(err=> {
        res.status(500).json({
            status:false,
            message:'unsucess',
            error:err
        })
    });
}



const productdetail = async (req, res) => {

     productid = req.params.productid;
     var pro_id = new ObjectId(productid);
     Pro.find().find({ _id: pro_id })
    .then(result => {
     res.status(200).json({
         status:true,
         message:'sucess',
         ProductDetail:result
     });
    })
    .catch(err=> {
        res.status(500).json({
            status:false,
            message:'unsucess',
            error:err
        })
    });
}

  module.exports = { getproducts, productdetail };
