const express = require("express");
const router = express.Router();

const controller = require("../src/controller/file.controller");

const usercontroller = require("../controllers/usersController");

const productcontroller = require("../controllers/productController");

let routes = (app) => {
  router.post("/post-product", controller.upload);

  router.get("/get-product", controller.getproduct);

  router.get("/get-users", usercontroller.getuser);

  router.get("/user-detail/:userid", usercontroller.getudetail);

  router.get("/get-products", productcontroller.getproducts);

  router.get("/product-detail/:productid", productcontroller.productdetail);

  app.use(router);
};
module.exports = routes;