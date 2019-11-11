const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const projectRouter = require("./data/helpers/projectRouter");
const actionRouter = require("./data/helpers/actionRouter");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(logger);

server.use("/projects", projectRouter);
server.use("/actions", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method}  Request`);
  console.log(`${req.url}  Request URL`);
  let timeStamp = new Date();
  console.log(`${timeStamp}  Timestamp`);
  next();
}

module.exports = server;
