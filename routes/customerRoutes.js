const express = require("express");
const customerRouter = express.Router();
var vendingData = require('../data.js');
var purchaseData = require("../purchaseData.js");

customerRouter.get("/items", (req, res) => {
  res.json( {"status": "success", "data": vendingData.items} 
    );
    console.log(vendingData);
}); 

customerRouter.post("/items/:itemId/purchases", (req, res) => {
  let purchaseData = req.body;
  console.log("purchaseData = ", purchaseData);

  vendingData.items.forEach(function(vending) {
    if (vending.id == req.params.itemId) {
      console.log(req.body.money_given); 
      if (vending.quantity > 0) {
          if (req.body.money_given >= vending.cost) {

            // TODO: subtract quantity / update items purchased

            res
              .status(200)
              .send({ 
                "status": "success",
                "data": {
                  "money_given": req.body.money_given,
                  "money_required": vending.cost,
                  "change_returned": req.body.money_given - vending.cost,
                  "message": "ENJOY YOUR PURCHASE"
                }
            });
          } else { // not enough money
            res
              .status(200)
              .send({ 
                "status": "fail",
                "data": {
                  "money_given": req.body.money_given,
                  "money_required": vending.cost,
                  "change_returned": req.body.money_given,
                  "message": "YOU DON'T HAVE ENOUGH MONEY FOR THIS ITEM"
                }
            });
          }
      } else { // out of stock
        res
          .status(200)
          .send({ 
            "status": "fail",
            "data": {
              "money_given": req.body.money_given,
              "money_required": vending.cost,
              "change_returned": req.body.money_given,
              "message": "OUT OF STOCK"
            }
        });
      }
    }
  });
}); 

module.exports = customerRouter;