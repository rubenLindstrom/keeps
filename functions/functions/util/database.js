// HENKCHOFF OCH JENNIBOB
"use strict";

const Sequelize = require("sequelize");
const userModel = require("../models/user.model");
const noteModel = require("../models/note.model");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db",
  alter: true
});

//  ***** MODELS
const User = userModel(sequelize, Sequelize);
const Note = noteModel(sequelize, Sequelize);

// Connects tables by Key
User.hasMany(Note);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("The database and tables have been created");
  })
  .catch(console.error);

module.exports = {
  User,
  Note
};
