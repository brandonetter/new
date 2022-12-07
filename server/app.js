const sequelize = require("sequelize");
const express = require("express");
const app = express();
require("dotenv").config({ path: "../.env" });

const routes = require("./routes");
for (let r of routes) {
  app.use(r.path, r.route);
}
console.log(process.env.SERVER_PORT);
app.listen(process.env.SERVER_PORT || 8888, () =>
  console.log("server running")
);
