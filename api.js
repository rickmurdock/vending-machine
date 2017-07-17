const express = require("express");
const bodyParser = require("body-parser");
const customerRouter = require("./routes/customerRoutes");
const vendorRouter = require("./routes/vendorRoutes");
const app = express();
const port = 3000;
// var vendingData = require('./data.js');
// var purchaseData = require("./purchaseData.js");

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use("/api/customer", customerRouter);
app.use("/api/vendor", vendorRouter);

// LISTENER
app.listen(port, function() {
  console.log("Vending API running on port: ", port);
}); 

module.exports = app;