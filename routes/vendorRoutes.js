const express = require("express");
const vendorRouter = express.Router();
var vendingData = require('../data.js');
var purchaseData = require("../purchaseData.js");

vendorRouter.get("/purchases", (req, res) => {
  res.json( {"status": "success", "data": purchaseData.purchases} 
    );
    console.log(vendingData);
}); 


vendorRouter.get("/money", (req, res) => {
  res.json( {"status": "success", "data": vendingData.money_accepted} 
    );
    console.log(vendingData);
}); 

vendorRouter.post("/items", (req, res) => {
  let itemData = req.body;
  console.log("itemData = ", itemData);
  vendingData.items.push(itemData);
  res.status(200).send("item is added");
}); 

vendorRouter.put("/items/:itemId", (req, res) => {
  let itemId = req.params.itemId;
  let itemData = req.body;
  vendingData.items.forEach(function(item) {
    if (item.id === itemId) {
      item.description = itemData.description;
      item.cost = itemData.cost;
      item.quantity = itemData.quantity;
    }
  });
  console.log("VENDING DATA ", vendingData);
  let updateData = req.body;
  console.log("itemData = ", itemData);
  vendingData.items.push(itemData);
  res.status(200).send("item is updated");
}); 

module.exports = vendorRouter;