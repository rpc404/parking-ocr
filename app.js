const express = require("express");
const app = express();
const RecordRouter = require("./api/routes/Record");
const CheckoutRouter = require("./api/routes/Checkout");

// security modules
const helmet = require("helmet");

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);

const cors = require("cors");

// @note - this is a very permissive CORS config
const corsOptions = {
  origin: "https://example.com",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app
  .use("/api/v1/record", cors(), RecordRouter)
  .use("/api/v1/checkout", cors(), CheckoutRouter)
  .use("*", (req, res) => {
    res.status(404).send("404 Not Found");
  });

module.exports = app;
