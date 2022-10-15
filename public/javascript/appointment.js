var index = 0;
var servInput;
var techInput;

const getFormattedDate = (dateStr, timeSlot) => {
  const date = new Date(dateStr);
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  // open at 9:30 closed at 7:30
  var minute = (timeSlot+1)%4*15;
  var hour = (timeSlot+1-(timeSlot+1)%4)/4+9;
  if (minute<10) minute = "0" + minute;
  if (hour<10) hour = "0" + hour;

  return year + '-' + month + '-' + day + "T" + hour + ":" + minute + ":00";
}

const calendarAppoinmentHandler = async function() {
  var bookingDiv = document.getElementById('booking');
  var calendarEl = document.getElementById('calendar');
  if (calendarEl.style.display == "block") return;
  // get all appointments
  const response = await fetch('/api/appointments', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  // if found:
  if (response.ok) {
    // array of appointents 
    var appts = [];

    // converting data received to formated array according to FullCalendar
    const apptData = await response.json();
    const appointments = apptData.appointments;
    appointments.forEach(appt => {
      appts.push({
        "title" : appt.user.first_name + " " + appt.user.last_name,
        "start" : getFormattedDate(appt.date, appt.time_slot),
        "description" : appt.user.email + "\nPhone: " + appt.user.phone,
      });
    });
    
    // get calendar div and render appt datas into
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
    bookingDiv.style.display = "block";
    calendar.render();
  
  // if not found anymore or fail
  } else {
    alert('Failed ON server');
  } 
}

const fetchAllServices = async function() {
  servInput = document.createElement("select");
  const response = await fetch('/api/services', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    const servData = await response.json();
    var services = servData.services;
    for (let i = 0; i <= services.length; i++) {
      const servOpt = document.createElement("option");
      if (i==0) servOpt.innerHTML = "Please pick a service.";
      else {
        servOpt.innerHTML = services[i-1].name;
        servOpt.value = services[i-1].id;
      }
      servInput.append(servOpt);
    }
  } else {
    alert('Failed ON server');
  }
}

const fetchAllTechnicians = async function() {
  techInput = document.createElement("select");
  const response = await fetch('/api/users?role=technician', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    const technicians = await response.json();
    for (let i = -1; i <= technicians.length; i++) {
      const techOpt = document.createElement("option");
      if (i==-1) techOpt.innerHTML = "Please pick a service.";
      else if (i==0) {
        techOpt.innerHTML = "Any technicians";
        techOpt.value = 0;
      } else {
        techOpt.innerHTML = technicians[i-1].first_name;
        techOpt.value = technicians[i-1].id;
      }
      techInput.append(techOpt);
    }
  } else {
    alert('Failed ON server');
  }
}

const apptTimeslotSelectHandler = function() {
  let apptTimeslotSelect = document.querySelector('#appt-timeslot-select');
  let timeslotArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
  timeslotArray = timeslotArray.map(timeslot => {
    let minute = (timeslot+1)%4*15;
    let hour = (timeslot+1-(timeslot+1)%4)/4+9;
    if (minute<10) minute = "0" + minute;
    if (hour<10) hour = "0" + hour;
    return hour + ":" + minute;
  });
  for (let index = 1; index <= timeslotArray.length; index++) {
    let timeslotOption = document.createElement("option");
    if (index < 4) {
      timeslotOption.disabled = true;
      timeslotOption.innerHTML = timeslotArray[index-1] + " (Not Available)";
    } else {
      timeslotOption.disabled = false;
      timeslotOption.innerHTML = timeslotArray[index-1];
    }
    timeslotOption.value = index;
    apptTimeslotSelect.append(timeslotOption);
  }
}

apptTimeslotSelectHandler();
fetchAllServices();
fetchAllTechnicians();

const addBookingService = async function() {
  const servTechDiv = document.getElementById('service-tech-div');

  index++;
  var servInputTemp = document.createElement("select"); 
  servInputTemp.innerHTML = servInput.innerHTML;
  servInputTemp.id = "serv-" + index + "-input";

  var techInputTemp = document.createElement("select");
  techInputTemp.innerHTML = techInput.innerHTML;
  techInputTemp.id = "tech-" + index + "-input";

  servTechDiv.append(servInputTemp);
  servTechDiv.append(techInputTemp);
}

document
  .querySelector('#serv-tech-add-more-btn')
  .addEventListener('click', addBookingService);