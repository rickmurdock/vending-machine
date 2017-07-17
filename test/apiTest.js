const apiApp = require("../api");
// const assert = require("assert");
const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
chai.should();  // makes should method available
const request = require("supertest");

describe("GET /api/customer/items", function() {
  it("should return successfully", function(done) {
    request(apiApp)
      .get("/api/customer/items")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
        res.body.data[0].id.should.be.above(-1);
        assert.equal(res.body.data[0].description, "Corn chips");
        res.body.data[0].cost.should.be.above(0);
        res.body.data[0].quantity.should.be.above(-1);
      })
      .end(done);
  });
});

describe("POST /api/customer/items/:itemId/purchases", function() {
  it("should return successfully", function(done) {
    const newItem = {
            "money_given": 130
        }
    request(apiApp)
      .post("/api/customer/items/2/purchases")
      .send(newItem)
      .expect(200)
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
        assert.equal(res.body.data.message, "ENJOY YOUR PURCHASE");
        assert.equal(res.body.data.money_given, 130);
        assert.equal(res.body.data.money_required, 35);
        assert.equal(res.body.data.change_returned, 95);
      })
      .end(done);
  });
});

describe("GET /api/vendor/purchases", function() {
  it("should return successfully", function(done) {
    request(apiApp)
      .get("/api/vendor/purchases")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
        res.body.data[0].id.should.be.above(0);
        res.body.data[0].description.should.not
      })
      .end(done);
  });
});

describe("GET /api/vendor/money", function() {
  it("should return successfully", function(done) {
    request(apiApp)
      .get("/api/vendor/money")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
        res.body["data"].should.be.above(0);
      })
      .end(done);
  });
});

describe("POST /api/vendor/items", function() {
  it("should return successfully", function(done) {
    const newItem = {
            "id": 4,
            "description": "Coffee",
            "cost": 30,
            "quantity": 50
        }
    request(apiApp)
      .post("/api/vendor/items")
      .send(newItem)
      .expect(200)
      .expect("item is added")
      .end(done);
  });
});

describe("PUT /api/vendor/items/:itemId", function() {
  it("should return successfully", function(done) {
    const updateItem = {
            "description": "Bubble Gum",
            "cost": 25,
            "quantity": 100
        }
    request(apiApp)
      .put("/api/vendor/items/2")
      .send(updateItem)
      .expect(200)
      .expect("item is updated")
      .end(done);
  });
});
