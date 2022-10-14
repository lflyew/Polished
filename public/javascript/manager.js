const getFormattedDate = (dateStr, timeSlot) => {
  const date = new Date(dateStr);
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  // open at 9:30 closed at 7:30

  return year + '-' + month + '-' + day;
}

const managerBtnHandler = async function() {

  const response = await fetch('/api/appointments', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const apptData = await response.json();
    const appointments = apptData.appointments;
    var appts = [];
    appointments.forEach(appt => {
      appts.push({
        "title" : appt.user.first_name + " " + appt.user.last_name,
        "start" : getFormattedDate(appt.date, appt.time_slot),
        "description" : appt.user.email + "\nPhone: " + appt.user.phone,
      });
    });
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid' ],
      initialView: 'dayGridMonth',

      eventRender: function(info) {
        var tooltip = new Tooltip(info.el, {
          title: info.event.extendedProps.description,
          placement: 'top',
          trigger: 'hover',
          container: 'body'
        });
      },
      events: appts
    });
    calendarEl.style.display = "block";
    calendar.render();
  } else {
    alert('Failed to log out');
  }
};

document
  .querySelector('#manager-btn')
  .addEventListener('click', managerBtnHandler);