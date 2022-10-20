
const apptEditHandler = async function(event) {
  console.log(globalServices);
  console.log(globalTechnicians);
  var apptHistory = document.querySelector('.each-appointment-history');
    
  console.log(event.currentTarget.parentNode.children[0].dataset.apptId);
}

document.querySelectorAll('.appt-edit-btn').forEach(
  eachBtn => eachBtn.addEventListener('click', apptEditHandler)
);
