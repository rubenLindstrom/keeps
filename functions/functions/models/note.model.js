("use strict");

// Model formating of object note
// Defines mappings between a model and a table - sequelize automatically adds the attributes createdAt and updatedAt
module.exports = (sequelize, type) =>
  sequelize.define("note", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    title: type.STRING,
    body: type.STRING,
    // TODO: FIXA ARRAY
    // sharedWith: type.ARRAY,
    // uid of User
    sharedWith: type.STRING,
    owner: {
      type: type.STRING,
      foreignKey: true
    }
  });
