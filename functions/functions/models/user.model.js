// HENKCHOFF OCH JENNIBOB
"use strict";

// Model formating of object user
// Defines mappings between a model and a table - sequelize automatically adds the attributes createdAt and updatedAt
module.exports = (sequelize, type) =>
  sequelize.define("user", {
    uid: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    email: type.STRING,
    password: type.STRING,
    token: type.STRING
  });
