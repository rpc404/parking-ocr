const express = require("express");

const CheckoutRouter = express.Router();

CheckoutRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = CheckoutRouter;
