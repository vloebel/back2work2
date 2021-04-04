// import all models
const User = require('./User');
const Meeting = require('./Meeting')
const Participant = require('./Participant')


// first two associations link an 
// organizer (user) with each meeting
// they add to the schedule

User.hasMany(Meeting, {
  foreignKey: 'organizer_id'
});

Meeting.belongsTo(User, {
  foreignKey: 'organizer_id',
});

/////////////////////////////////////
// TESTING: ?
User.belongsToMany(Meeting, {
  through: Participant,
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Meeting.belongsToMany(User, {
  through: Participant,
  foreignKey: 'meeting_id',
  onDelete: 'SET NULL'
});

Participant.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Participant.belongsTo(Meeting, {
  foreignKey: 'meeting_id',
  onDelete: 'SET NULL'
});

User.hasMany(Participant, {
  foreignKey: 'user_id'
});

Meeting.hasMany(Participant, {
  foreignKey: 'meeting_id'
});


//////////////////////////////////
///  ORIGINAL CODE
// Through table links the meetings 
// with the users who are attending

User.belongsToMany(Meeting, {
  through: Participant,
  foreignKey: 'user_id',
});

Meeting.belongsToMany(User, {
  through: Participant,
  foreignKey: 'meeting_id',
});




module.exports = { User, Meeting, Participant  };
