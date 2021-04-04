const { Model, DataTypes, QueryInterface } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class Meeting extends Model{}

// create fields/columns for meeting model
// points to the employee who requsted the mtg
// one employee can have many meetings. each
//meeting belongs to ONE employee
Meeting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
      date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    // start time is a string HH:mm
    start: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // duration in hours, for example, 1.5
    // restrict to 15, or 30 min intervals?
    duration: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    meeting_name: {
      type: DataTypes.STRING,
      allowNull: false,
      devaultValue: 'TBD'
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    organizer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'meeting'
  }
  );

module.exports = Meeting;
QueryInterface