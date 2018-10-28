"use strict";

const express = require("express");
const router = express.Router();
const SecretSanta = require("../schemas/secretSanta");

const del = (req, res) => {
  SecretSanta.remove({ _id: req.params.secretSanta_id }, function(error) {
    res.send(204);
  });
};

const get = (req, res) => {
  SecretSanta.apiQuery(req.params, function(error, docs) {
    res.send(docs);
  });
};

const post = (req, res) => {
  const data = req.body || {};
  const secretSanta = new SecretSanta(data);

  secretSanta.save(function(error) {
    res.send(201);
  });
};

const put = (req, res) => {
  let data = req.body || {};

  SecretSanta.findOne({ _id: req.params.secretSanta_id }, function(error, doc) {
    if (!doc) {
      res.send(304);
    }

    SecretSanta.updateOne({ _id: data._id }, data, function(error) {
      res.send(200);
    });
  });
};

console.log("Rotas de secretSanta carregadas");

router.delete("/:secretSanta_id", del);
router.get("/", get);
router.post("/", post);
router.put("/:secretSanta_id", put);

module.exports = router;
