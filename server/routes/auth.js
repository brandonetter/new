const express = require("express");

let authRoute = express.Router();
authRoute.get("/", async (req, res) => {
  res.json("ah");
});

module.exports = authRoute;
