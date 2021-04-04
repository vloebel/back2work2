const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Meeting, Participant } = require('../../models');
const withAuth = require('../../utils/auth');

////////////////////////////////////////
//  THESE ARE THE PARTICIPANT ROUTES
//  --  This includes test queries for insomnia
//  --  because they can be a bit confusing
//  --  note that you might have to delete before inserting
//  --  if something's been added already
//  (P0) Dump the participant table (without includes)
//       GET localhost:3002/api/participants
//  (P1) Find all the meetings for a specified user 
//       /api/participants/meetings/:user_id
//       for example, all the meetings where user_id=6
//       GET localhost:3002/api/participants/meetings/6
//  (P2) Find all the users for a specified meeting
//      /api/participants/users/:meeting_id
//       for example, all the meetings where meeting_id=3
//       GET localhost:3002/api/participants/users/3
//  (P3) Add a participant and  meeting pair to Participant table
//       (don't worry about setting accepted flag - user 
//       will do that later)
//       POST localhost:3002/api/participants/
//       { "meeting_id": "6",  "user_id": "6" }
//  (P4) Delete a participant from a meeting
//       Delete api/participants/?user=id&meeting=id, for example
//       DELETE localhost:3002/api/participants/?user=4&meeting=4
//  (P5) UPDATE the Accepted flag for a Participant
//       PUT api/participants/?user=id&meeting=id with {accepted:boolean} in the body
//         FOR Example:
//           localhost:3002/api/participants?user=31&meeting=2
//           { "accepted":"true"}
//////////////////////////////////////////////////
//
//  vll : since there's no way to assign meetings
//  at this point except with insomnia, withAuth has been omitted
//  it should be added to each route when it is implemented

//////////////////////////////////////////////////
// (P0) Dump the Participant table
// Admin feature - not implemented 

router.get('/', (req, res) => {
  Participant.findAll({

  })
    .then(dbParticipantData => {
      if (!dbParticipantData) {
        res.status(404).json({
          message:
            `No participants found`
        });
        return;
      }
      res.json(dbParticipantData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

/////////////////////////////////////////
//  (P1) Get all meetings for specified user
//    /api/participants/meetings/:user_id
// called from dashboard to show meetings user is
// invited to

router.get('/meetings/:id', withAuth, (req, res) => {
  Participant.findAll({
    where: {
      user_id: req.params.id
    },
    include: [{
      model: User,
      attributes: ['id', 'firstname', 'lastname']
    },
    {
      model: Meeting,
      attributes: ['id', 'date',
        'start', 'duration',
        'meeting_name', 'topic'
      ],
    }]
  })
    .then(dbParticipantData => {
      if (!dbParticipantData) {
        res.status(404).json({
          message:
            `No meeting found for user: ${req.params.id}`
        });
        return;
      }
      res.json(dbParticipantData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

/////////////////////////////////////////
//  (P2) Get all the users invited to a specified meeting_id
//   /api/participants/users/:meeting_id
// not implemented

router.get('/users/:id', (req, res) => {
  Participant.findAll({
    where: {
      meeting_id: req.params.id
    },
    include: [{
      model: User,
      attributes: ['id', 'firstname', 'lastname']
    },
    {
      model: Meeting,
      attributes: ['id', 'date',
        'start', 'duration',
        'meeting_name', 'topic'
      ],
    }]
  })
    .then(dbParticipantData => {
      if (!dbParticipantData) {
        res.status(404).json({
          message:
            `No meeting found for meeting: ${req.params.id}`
        });
        return;
      }
      res.json(dbParticipantData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


/////////////////////////////////////////////////////////
//  (P3) CREATE A meeting/user entry
//  post /api/participants/
//  {meeting_id : user_id}  for example
// {"7" : "4"}
//  leave "accepted" flag null because the person who
//  invites doesn't know if they will accept or not
//  not implemented

router.post('/', (req, res) => {
  Participant.create({
    meeting_id: req.body.meeting_id,
    user_id: req.body.user_id,
  })
    .then(dbMeetingData => {
      res.json(dbMeetingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//  (P4) DELETE a user/meeting pair, effectively
//  removing that user's invitation from the meeting
// there could be other routes, like remove ALL
// of a user's meetings, but that' not in the spec. 
// DELETE api/participants  - user id and meeting id in body.
// not implemented

router.delete('/', (req, res) => {
  Participant.destroy( {
    where: {
      user_id: req.query.user,
      meeting_id: req.query.meeting
    }
  })
    .then(dbParticipantDataa => {
      if (!dbParticipantDataa) {
        res.status(404).json({ message: `No match found with  user_id: ${user_id}meeting_id: & ${meeting_id}` });
        return;
      }
      res.json(dbParticipantDataa);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

////////////////////////////////////
//  Update "accepted" flag
//  
//  put api/participants/?user=id&meeting=id
//  for example: 
//  localhost:3002/api/participants?user=31&meeting=2
//   and then have the flag in the body:
//   { accepted:true}
//  called from dashboard.js to update meeting acceptance

router.put('/', withAuth, (req, res) => {
  Participant.update(req.body, {
    individualHooks:true,
    where: {
      user_id: req.query.user,
      meeting_id: req.query.meeting
    }
  })
    .then(dbParticipantDataa => {
      if (!dbParticipantDataa) {
        res.status(404).json({ message: `No match found with  user_id: ${user_id}meeting_id: & ${meeting_id}` });
        return;
      }
      res.json(dbParticipantDataa);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});


module.exports = router;
