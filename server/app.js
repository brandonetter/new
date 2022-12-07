const sequelize = require("sequelize");
const express = require("express");
const cors = require("cors");
const app = express();
const { expressjwt: jwt } = require("express-jwt");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
require("dotenv").config({ path: "../.env" });
// app.use(
//   jwt({
//     secret: process.env.SECRET,
//     algorithms: ["HS256"],
//     getToken: (req) => req.cookies.token,
//   })
// );
app.use(cors());
app.use(express.json());

const routes = require("./routes");
for (let r of routes) {
  app.use(r.path, r.route);
}
console.log(process.env.SERVER_PORT);
app.listen(process.env.SERVER_PORT || 8888, () =>
  console.log("server running")
);
