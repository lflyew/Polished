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

const managerBtnHandler = async function(event) {
  await calendarAppoinmentHandler();
  await fetchAllServices();
  await fetchAllTechnicians();
  event.target.style.display = "none";
};

document
  .querySelector('#manager-btn')
  .addEventListener('click', managerBtnHandler);

const isPhoneNumber = function(str) {
  const num = str.replace(/\D/g, '');
  if (num.length != 10) return false;
  return num;
}

const customerSearchHandler = async function() {
  const phoneInput = document.getElementById('phone-input');
  const customerNameDiv = document.getElementById('customer-name-div');
  var phoneNumber = isPhoneNumber(phoneInput.value);
  if (phoneNumber) {
    // get all appointments
    const response = await fetch('/api/users?phone='+phoneNumber, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      const customer = await response.json();
      customerNameDiv.innerHTML = customer.first_name + " " + customer.last_name;
      customerNameDiv.dataset.userId = customer.id;
      customerNameDiv.style.display = "block";
    } else {
      console.log('Please sign-up for this customer first.');
    }

  } else alert('Please input a phone number');
}

document
  .querySelector('#customer-search-btn')
  .addEventListener('click', customerSearchHandler);
