const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class Participant extends Model{}

// create fields/columns for meeting model
// points to meeting, the meetinged participant, 
// and says whether or not it's accepted
//one meeting meeting will have many participants
//participants can be assigned to multiple mtgs.
// but not at the same time, so they are unique per meeting
Participant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },

    meeting_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'meeting',
        key: 'id'
      }
    },
  
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull:true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'participant'
  }
);

module.exports = Participant;
