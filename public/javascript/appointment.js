<<<<<<< HEAD
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
=======
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
    timeslotOption.disabled = false;
    timeslotOption.innerHTML = timeslotArray[index-1];
    timeslotOption.value = index;
    apptTimeslotSelect.append(timeslotOption);
  }
}

apptTimeslotSelectHandler();

var index = 0;
var servInput;
var techInput;
>>>>>>> 845e61a35741fb20dad8a15ea54157c0642d5c99

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
<<<<<<< HEAD
      if (i==0) servOpt.innerHTML = "Please pick a service.";
      else {
        servOpt.innerHTML = services[i-1].name;
=======
      if (i==0) {
        servOpt.innerHTML = "Please pick a service.";
        servOpt.value = -1;
      } else {
        servOpt.innerHTML = services[i-1].name;
        servOpt.dataset.time = services[i-1].time_frame/15;
>>>>>>> 845e61a35741fb20dad8a15ea54157c0642d5c99
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
<<<<<<< HEAD
      if (i==-1) techOpt.innerHTML = "Please pick a service.";
      else if (i==0) {
=======
      if (i==-1) {
        techOpt.innerHTML = "Please pick a technician.";
        techOpt.value = -1;
      } else if (i==0) {
>>>>>>> 845e61a35741fb20dad8a15ea54157c0642d5c99
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

<<<<<<< HEAD
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
=======
const checkAvailableHandler = async function (event) {
  var temp = event.target.id.split("-");
  var id = temp[temp.length-2];
  var serv = document.getElementById("serv-" + id + "-input");
  var techId = document.getElementById("tech-" + id + "-input").value;
  var date = document.getElementById("appt-day-input").value;
  var timeslot = document.getElementById("appt-timeslot-select").value;
  if (techId < 0 || !date || !timeslot || !serv.value) {
    alert("Need info before checking.");
    return;
  }
  if (techId !== "0") {
      const response = await fetch('/api/appointments/available', {
        method: 'POST',
        body: JSON.stringify({"user_id": techId, "date": date, "time_slot": timeslot, "time_frame": serv.options[serv.selectedIndex].dataset.time}),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) alert("Available");
      else alert("Unavailable");
  } else alert("Available");
}

const addBookingService = async function() {
  const servTechDiv = document.getElementById('service-tech-div');

  await fetchAllServices();
  await fetchAllTechnicians();

  index++;

>>>>>>> 845e61a35741fb20dad8a15ea54157c0642d5c99
  var servInputTemp = document.createElement("select"); 
  servInputTemp.innerHTML = servInput.innerHTML;
  servInputTemp.id = "serv-" + index + "-input";

  var techInputTemp = document.createElement("select");
  techInputTemp.innerHTML = techInput.innerHTML;
  techInputTemp.id = "tech-" + index + "-input";
<<<<<<< HEAD

  servTechDiv.append(servInputTemp);
  servTechDiv.append(techInputTemp);
=======
  
  var checkAvailableBtn = document.createElement("button");
  checkAvailableBtn.innerHTML = "Check Available";
  checkAvailableBtn.id = "check-available-"+ index +"-btn";
  checkAvailableBtn.className = "checkavailablebtn";

  checkAvailableBtn.addEventListener("click", checkAvailableHandler);

  servTechDiv.append(servInputTemp);
  servTechDiv.append(techInputTemp);
  servTechDiv.append(checkAvailableBtn);
>>>>>>> 845e61a35741fb20dad8a15ea54157c0642d5c99
}

document
  .querySelector('#serv-tech-add-more-btn')
<<<<<<< HEAD
  .addEventListener('click', addBookingService);
=======
  .addEventListener('click', addBookingService);

const aptSubmitBtnHandler = async function () {
  var date = document.getElementById("appt-day-input").value;
  var timeslot = document.getElementById("appt-timeslot-select").value;
  var userId = document.getElementById("customer-name-div").dataset.userId;
  var apptId;

  try {
    var response = await fetch('/api/appointments/', {
      method: 'POST',
      body: JSON.stringify({"user_id": userId, "date": date, "time_slot": timeslot}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      var apptData = await response.json();
      apptId = apptData.appointment_id;
    }
  } catch (err) {
    alert(err);
  }

  var servTechDiv = document.getElementById("service-tech-div");
  var totalServices = (servTechDiv.children.length-servTechDiv.children.length%3)/3;
  var bookingData = [];
  for (let i=1; i<=totalServices; i++) {
    let servId = document.getElementById("serv-"+i+"-input").value;
    let techId = document.getElementById("tech-"+i+"-input").value;
    if (servId > 0) {
      if (techId == 0) bookingData.push({"appointment_id": apptId, "service_id": servId });
      else if (techId > 0) bookingData.push({"appointment_id": apptId, "service_id": servId, "user_id": techId});
    }
  }
  
  try {
    var response = await fetch('/api/bookings/', {
      method: 'POST',
      body: JSON.stringify({"data": bookingData}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) document.location.replace("/manager");
  } catch (err) {
    alert(err);
  }
}

document
  .querySelector('#appt-submit-btn')
  .addEventListener('click', aptSubmitBtnHandler);
>>>>>>> 845e61a35741fb20dad8a15ea54157c0642d5c99
