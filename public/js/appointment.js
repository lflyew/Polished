const apptFormHandler = async (event) => {
    event.preventDefault(); 

     //making a post to our API 
     const response = await fetch('/api/appointment', {
        method: 'POST',
        //letting the server know that its json data
        headers: { 'Content-Type': 'application/json' }, 
      });
    
      if (response.ok) {
        //if the response is successful and user is logged out you take them back to the login page
        document.location.replace('/');
      } else {
        alert('Failed to load appointment page');
      }
}; 
document
    .querySelector('#appt-btn')
    .addEventListener('submit', apptFormHandler);