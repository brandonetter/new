const express = require("express");
const sequelize = require("sequelize");
require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { user, kanban, group } = require("../../models");
let authRoute = express.Router();
authRoute.get("/", async (req, res) => {
  try {
    let token = req.cookies.token;
    jwt.verify(token, SECRET, async (err, decoded) => {
      if (err) throw new Error(err);
      if (decoded) {
        let user1 = await user.findOne({
          where: { name: decoded.user },
          include: [kanban],
        });
        console.log(user1.kanbans);
        res.json(user1.kanbans);
      }
    });
  } catch {
    res.json({ error: "unverified" });
  }
  //res.json();
});
authRoute.put("/", async (req, res) => {
  //console.log(req.body);
  let kb = await kanban.findOne({ where: { id: req.body.id } });
  let data = { cols: req.body.cols, data: req.body.data };
  kb.data = JSON.stringify(data);
  await kb.save();
  console.log(kb);
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
          data: JSON.stringify({ cols: body.cols, data: {} }),
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

module.exports = authRoute;
