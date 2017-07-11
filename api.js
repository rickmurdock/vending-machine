const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
var vendingData = require('./data.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/customer/items", (req, res) => {
  res.json( {"status": "success", "data": vendingData.items} 
    );
    console.log(vendingData);
}); 

app.get("/api/vendor/money", (req, res) => {
  res.json( {"status": "success", "data": vendingData.money_accepted} 
    );
    console.log(vendingData);
}); 

app.post("/api/vendor/items", (req, res) => {
  // console.log("REQUEST", req.body);
  let itemData = req.body;
  console.log("itemData = ", itemData);
  vendingData.items.push(itemData);
  res.json( {"status": "success", "data": vendingData.items} 
    );
}); 


// LISTENER
app.listen(port, function() {
  console.log("Vending API running on port: ", port);
}); 

module.exports = app;