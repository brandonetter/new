const express = require("express");
const sequelize = require("sequelize");
require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { user, kanban, group } = require("../../models");
let authRoute = express.Router();
authRoute.get("/", async (req, res) => {
  res.json("ah");
  console.log(req.token);
});
authRoute.get("/verify", async (req, res) => {
  try {
    let token = req.cookies.token;
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) throw new Error(err);
      if (decoded) {
        res.json(decoded);
      }
    });
  } catch {
    res.json({ error: "unverified" });
  }
  //res.json();
});
authRoute.post("/login", async (req, res) => {
  try {
    let body = req.body;
    body.password = await crypto
      .createHash("sha256", SECRET)
      .update(body.password)
      .digest("hex");
    let userData = {
      name: body.username,
      hash: body.password,
    };
    if (body.username.length < 8) {
      throw new Error();
    }
    let User = await user.findOne({ where: userData });
    if (!User) throw new Error();
    const token = jwt.sign({ user: User.name }, SECRET);
    if (!token) throw new Error();

    res.cookie("token", token, { httpOnly: true });
    res.json({ code: "success", token: token });
  } catch {
    res.json({ code: "failure" });
  }
});
authRoute.post("/", async (req, res) => {
  try {
    let body = req.body;
    body.password = await crypto
      .createHash("sha256", SECRET)
      .update(body.password)
      .digest("hex");
    let userData = {
      name: body.username,
      hash: body.password,
    };
    if (body.username.length < 8) {
      throw new Error();
    }
    let newUser = await user.create(userData);

    res.json({ code: "success", newUser });
  } catch {
    res.json({ code: "failure" });
  }
});
module.exports = authRoute;
