"use strict";

const bodyParser = require("body-parser");
const config = require("./config");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const server = express();

const whitelist = [
  "https://k121-frontend.herokuapp.com",
  "http://localhost:8080"
];

const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

server.options("*", cors(corsOptions));
server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use("/raffle", require("./routes/raffle"));
server.use("/secretSanta", require("./routes/secretSanta"));
server.all("*", (request, response) => {
  response.send(404);
});

server.listen(config.express.port, function() {
  console.log(`Servidor em execução na porta ${config.express.port}`);

  mongoose.connection.on("error", error => {
    console.error(`Erro ao conectar com mongoose: ${error}`);
    process.exit(1);
  });

  mongoose.connection.on("open", error => {
    if (error) {
      console.error(`Erro ao conectar com mongoose: ${error}`);
      process.exit(1);
    }

    console.log("Conectado com mongoose");
  });

  global.db = mongoose.connect(
    config.mLab.uri,
    config.mongoDB.options
  );
});
