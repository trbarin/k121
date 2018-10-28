"use strict";

const config = require("../config");
const express = require("express");
const mailgun = require("mailgun-js")({
  apiKey: config.mailgun.apiKey,
  domain: config.mailgun.domain
});
const router = express.Router();
const SecretSanta = require("../schemas/secretSanta");

const sendEmail = data => {
  const email = {
    from: `Teste Pratico <k121@${config.mailgun.domain}>`,
    subject: "Amigo secreto",
    text: `Olá ${data.name},\n\nSeu amigo secreto é: ${data.friend}`,
    to: `${data.name} <${data.email}>`
  };

  mailgun.messages().send(email, function(error, body) {
    if (error) {
      console.error(error);
    } else {
      console.log(body);
    }
  });
};

const shuffle = array => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const updateFriend = data => {
  SecretSanta.findOne({ _id: data._id }, function(error, doc) {
    if (error) {
      console.error(error);
      return;
    } else if (!doc) {
      console.error("O item não foi encontrado");
      return;
    }

    SecretSanta.updateOne({ _id: data._id }, data, function(error) {
      if (error) {
        console.error(error);
      }
    });
  });
};

const post = (req, res) => {
  SecretSanta.apiQuery(req.params, function(error, docs) {
    if (error) {
      console.error(error);
      res.status("500").send(erros);
      return;
    }

    docs.forEach(doc => {
      doc.friend = "";
    });

    docs.forEach(doc => {
      const shuffleDocs = shuffle(docs.filter(d => d._id !== doc._id));
      const shuffleDoc = shuffleDocs.filter(
        s => !docs.some(d => s.name === d.friend)
      )[0];
      doc.friend = shuffleDoc.name;
      updateFriend(doc);
      sendEmail(doc);
    });

    res.send(docs);
  });
};

console.log("Rotas de raffle carregadas");

router.post("/", post);

module.exports = router;
