const authRoute = require("./auth.js");
const kanbanRoute = require("./kanban.js");
module.exports = [
  {
    route: authRoute,
    path: "/auth",
  },
  {
    route: kanbanRoute,
    path: "/kanban",
  },
];
