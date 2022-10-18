const apptFormHandler = async (event) => {
    event.preventDefault(); 

  const nailTech = document.querySelector('#nail-tech').value.trim(); 
  const date = document.querySelector('#date').value.trim();
  const service = document.querySelector('#service-type').value.trim();
  const timeslot = document.querySelector('#time-slot').value.trim();

  
   if (nailTech && date && service && timeslot) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ nailTech, date, service, timeslot }),
      headers: { 'Content-Type': 'application/json' }, 
    });
    if (response.ok) {
      document.location.replace('/appointment');
    } else {
      alert('Failed to load appointment page');
    }
   }
}; 
document
    .querySelector('#appt-btn')
    .addEventListener('submit', apptFormHandler);