"use strict";

const mongoose = require("mongoose");
const mongooseApiQuery = require("mongoose-api-query");

const SecretSantaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  friend: {
    type: String,
    required: false,
    trim: true
  }
});

SecretSantaSchema.plugin(mongooseApiQuery);

module.exports = mongoose.model("SecretSanta", SecretSantaSchema);
