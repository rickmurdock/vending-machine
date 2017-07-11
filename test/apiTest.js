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
    request(apiApp)
      .get("/api/vendor/items")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
        // res.body["data"].should.be.above(0);
      })
      .end(done);
  });
});
