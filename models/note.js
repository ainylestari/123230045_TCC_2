'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {}

  Note.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    judul: {
      type: DataTypes.STRING,
      allowNull: false
    },

    isi: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    tanggal_dibuat: {
      type: DataTypes.DATE,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Note',
    tableName: 'notes',
    timestamps: false,
  });

  return Note;
};