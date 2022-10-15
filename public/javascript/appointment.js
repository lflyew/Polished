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

const addBookingService = function() {
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

const aptSubmitBtnHandler = function () {
  console.log('here');
}

document
  .querySelector('#appt-submit-btn')
  .addEventListener('click', aptSubmitBtnHandler);