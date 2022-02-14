const uploadFile = require("../middleware/upload");
const mongoose = require("mongoose");
var db = mongoose.connection;

const createddate = new Date();

const upload = async (req, res) => {
  try {
    await uploadFile(req, req.body);  
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    if (req.body.title == undefined) {
      return res.status(400).send({ message: "Please add title" });
    }
    if (req.body.sku == undefined) {
      return res.status(400).send({ message: "Please add sku" });
    }
    if (req.body.category_id == undefined) {
      return res.status(400).send({ message: "Please add category" });
    }
    if (req.body.subcategory_id == undefined) {
      return res.status(400).send({ message: "Please add subcategory" });
    }
    var Productdata = {
      title: req.body.title,
      tagline: req.body.tagline,
      sku: req.body.sku,
      category_id: req.body.category_id,
      subcategory_id: req.body.subcategory_id,
      detail: req.body.detail,
      price: req.body.price,
      selling_price: req.body.selling_price,
      stock: req.body.stock,
      image: req.file.originalname,
      created_at:createddate
      
    };
    const ress = await db.collection('products').insertOne(Productdata);
    res.json({
      status:true,
      data:ress, 
      message:'Added sucessfully'
  });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};


const getproduct = async (req, res) => {
 
  await db.collection("products").find().toArray( function(err, result) {
    if(err) throw err;
    res.json({
      status:true,
      message:'sucess',
      data:result 
  });
});



}

module.exports = { upload, getproduct };
