const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Meeting, Participant } = require("../models");
const withAuth = require("../utils/auth");

// FIND ALL the meetings for the logged-in user
// INCLUDE the users who are invited to that meeting
// called with get /dashboard/


router.get("/", withAuth, (req, res) => {
  console.log("======================");

  // Get the meeting-invitations for logged-in user;

  Participant.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["user_id", "meeting_id", "accepted"],
    include: [
      {
        model: User,
        attributes: ["firstname", "lastname"],
      },
      {
        model: Meeting,
        attributes: ["date", "start", "duration", "meeting_name", "topic"],
      },
    ],
  })
    // Maps the database rows into an array of objects
    // (one object for each "row" in the form columnName:value)
    .then((dbData) => {

      // console.log(JSON.stringify(dbData));
      var mappedParticipantArray = dbData
        .map((element, i) => {
          // use the "accepted" attribute to set a
          // text string to pass into handlebars
          // must be this EXACT text because we use it
          // to convert back to boolean in handlebars.js
          let acceptedStatus = "Not Sure";
          switch (element.dataValues.accepted) {
            case (true):
              acceptedStatus = "Accepted";
              break;
            case (false):
              acceptedStatus = "Declined"
              break;
          }

          var meetingArray1 = {
            participantId:element.dataValues.user_id,
            meetingId: element.dataValues.meeting_id,
            accepted: acceptedStatus,
            date: element.dataValues.meeting.date,
            start: element.dataValues.meeting.start,
            duration: element.dataValues.meeting.duration,
            meeting_name: element.dataValues.meeting.meeting_name,
            topic: element.dataValues.meeting.topic,
          };
          return meetingArray1;
        })
      // Get the meetings organized byh logged-in user;
      Meeting.findAll({
        where: {
          organizer_id: req.session.user_id,
        },
        attributes: ["id", "date", "start", "duration", "meeting_name", "topic"],
      })
        .then((dbData2) => {
          var mappedOrganizerArray = dbData2
            .map((element, i) => {
              var meetingArray2 = {
                organizerId: req.session.user_id,
                meetingId: element.dataValues.id,
                date: element.dataValues.date,
                start: element.dataValues.start,
                duration: element.dataValues.duration,
                meeting_name: element.dataValues.meeting_name,
                topic: element.dataValues.topic
              };
              return meetingArray2;
            });
          res.render("dashboard", {
            participantObj: mappedParticipantArray,
            meetingObj: mappedOrganizerArray,
            loggedIn: true
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      // }
    })

})




// LOADS THE ADD-MEETING PAGE with a form for
// submitting the new meeting.

router.get("/add-meeting/", withAuth, (req, res) => {
  res.render("add-meeting", {
    loggedIn: true,
  });
});

module.exports = router;
