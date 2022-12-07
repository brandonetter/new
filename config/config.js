require("dotenv").config();
const path = require("path");
console.log(path.resolve("wwwroot", "/server/", process.env.DB));
const basepath = path.resolve();
module.exports = {
  development: {
    storage: path.resolve(basepath, "server", process.env.DB),
    dialect: "sqlite",
  },
};
