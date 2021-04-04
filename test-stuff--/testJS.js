//date and time picker

$(function() {
  $('#dateTime').ejDateTimePicker({
    interval: 60,
    dateTimeFormat: "M/d/y HH:mm",
     width: '180px',
     value: new Date(),
     timeDrillDown: {
      enabled: true,
      interval: 30,
      showMeridian: false
     },
  });
});

 var storeMeeting = ()=>{
  console.log(document.getElementById('dateTime').value);

 };

 document.getElementById('submit').addEventListener('click', storeMeeting);