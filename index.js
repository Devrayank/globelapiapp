const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const express = require("express");
global.__basedir = __dirname;

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;


const initRoutes = require("./routes");
app.use(express.urlencoded({ extended: true }));
initRoutes(app);


// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});