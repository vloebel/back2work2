//////////////////////////////////////////////
//  add-meeting.js
//////////////////////////////////////////////
//
// CONTROL FLOW: 
// dashboard-routes ->
//   dashboard.handlebars ->
//    add-meeting.handlebars ->
//      add-meeting.js
//////////////////////////////////////////////

// const { Meeting } = require("../../models");


//////////////////////////////////////////////
// Places an event listner on new-meeting-form SUBMIT BUTTON
//  on SUBMIT addMeetingHandler 
//  LOADS data from the add-meeting.handlebars form and
//  POSTS the info to the route: /api/meetings 
//  if response  ok RETURNS via 
//  document.location.replace('/dashboard');

async function addMeetingHandler(event) {
  event.preventDefault();
  const meeting_name = document.querySelector('input[name="meeting-title"]').value.trim();
  const topic = document.querySelector('input[name="meeting-topic"]').value.trim();
  let dateTime = document.getElementById('meeting-date-time').value;
 
  // DateTime string format is "yyyy/MM.dd HH:mm" 
  // But database expects two variables: yyyy-mm-dd   and HH:mm
  // -------------NOTE IT ACTUALLY EXPECTS AN INTEGER, SO WE NEED TO CHANGE DB
  // it's goign to be a string for the first pass
  // Need to split into date and time
  // and replace the / with -

  dateTime = dateTime.split(" ");
  const start = dateTime[1];
  const date = (dateTime[0]).replace(/\//g, "-");

  // hard code some test data
  // need to change this to duration

 
  // console.log(`date  ${date}  and time   ${start}    `);
 
//TBD - WE COULD ADD SOME VALIDATION TO DATES AND TIMES
  // MAKE SURE THEY ROUND TO 15 MIN, FOR EXAMPLE
  // RIGHT NOW THE TIME IS A STRING AND THE DURATION
  // IS A FLOAT MEANING NUMBER OF HOURS, LIKE 1.25
  // however, duration is NOT in the form so we are 
  // hard coding it to 1.0 (hours) it's NOT displayed
  
  const duration = 1.0; //hours

  // The names below must match the database column names
  // the id of the organizer is the logged-in user's id
  // it is set to req.session.user_id in the route

  const response = await fetch(`/api/meetings`, {
    method: 'POST',
    body: JSON.stringify({
      date,
      start,
      duration,
      meeting_name,
      topic
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

/////////////////////////////////////////////////
//  date picker 
// jQuery triggers on calendar click in form
///////////////////////////////////////////
$(function () {
  $('#meeting-date-time').ejDateTimePicker({
    interval: 30,
    dateTimeFormat: "yyyy/MM/dd HH:mm",
    highlightWeekend:true, // highlight the weekend in DatePicker calendar
    width: '180px',
    value: new Date()
  });
});

/////////drop down event listener//////////
// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.dropdown-trigger');
//   var instances = M.Dropdown.init(elems, options);
// });

/////////////////////////////////////////////////////
// event listener 
/////////////////////////////////////////////////////

document.querySelector('.add-meeting-form').addEventListener('submit', addMeetingHandler);