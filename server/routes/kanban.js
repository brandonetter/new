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
authRoute.post("/", async (req, res) => {
  try {
    let token = req.cookies.token;
    jwt.verify(token, SECRET, async (err, decoded) => {
      if (err) throw new Error(err);
      if (decoded) {
        let user1 = await user.findOne({
          where: { name: decoded.user },
          include: [kanban],
        });
        let body = req.body;
        console.log(body.name);
        let kanban1 = await kanban.create({
          name: body.name,
          data: JSON.stringify(body.cols),
        });
        await user1.addKanban(kanban1);
        if (kanban1) {
          res.json(kanban1);
        }
      }
    });
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
