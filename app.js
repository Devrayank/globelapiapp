require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// importing user context
const User = require("./model/user");
const Product = require("./model/product");
const date = require('date-and-time')


// Register
app.post("/register", async (req, res) => {
    try {
      const { first_name, last_name, email, password,phone,address1, address2,city,state,country,zipcode } = req.body;
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
      const oldUser = await User.findOne({ email });
      if (oldUser) { return res.status(409).send("User Already Exist. Please Login"); }
      encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        phone,
        address1,
        address2,
        city:city,
        state,
        country,
        zipcode

      });
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2min",}
      );
      user.token = token;
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
});
// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {res.status(400).send("All input is required");}
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h",}
      );
      user.token = token;
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});



module.exports = app;