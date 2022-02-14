
const mongoose = require("mongoose");
const User = require("../model/user");
const ObjectId = require('mongodb').ObjectId; 

const getuser = async (req, res) => {
    User.find()
    .then(result => {
     res.status(200).json({
         status:true,
         message:'sucess',
         UserData:result
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

const getudetail = async (req, res) => {

    userid = req.params.userid;
    var user_id = new ObjectId(userid);
    User.find().find({ _id: user_id })
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




  module.exports = { getuser, getudetail };
