'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {}

  Note.init({
    judul: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isi: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Note',
    tableName: 'notes',
    timestamps: true,
  });

  return Note;
};