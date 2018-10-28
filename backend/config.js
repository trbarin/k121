"use strict";

// express
const port = process.env.PORT || 3000;

// mLab
const database = process.env.DATABASE_MLAB;
const pass = process.env.PASSWORD_MLAB;
const user = process.env.USER_MLAB;

// mailgun
const apiKey = process.env.API_KEY_MAILGUN;
const domain = process.env.DOMAIN_MAILGUN;

// mongoDB
const useNewUrlParser = true;

module.exports = {
  express: {
    port
  },
  mLab: {
    uri: `mongodb://${user}:${pass}@ds045521.mlab.com:45521/${database}`
  },
  mailgun: {
    apiKey,
    domain,
    uri: `https://api.mailgun.net/v3/${domain}`
  },
  mongoDB: {
    options: { useNewUrlParser }
  }
};
