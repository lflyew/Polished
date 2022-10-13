const loginFormHandler = async (event) => {
    event.preventDefault();
   // getting values from our form fields (the text boxes)
   const user = document.querySelector('#user-login').value.trim(); //removed empty space in front or on the end of hte string
   const password = document.querySelector('#password-login').value.trim();

   const appointment = document.querySelector('#apt-btn').value.trim();
  
   if (user && password && appointment) {
    //post request to our api to login 
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ user, password, appointment }),
      //letting the API know that I'm sending it json data 
      headers: { 'Content-Type': 'application/json' }, 
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
   }
  
  };
  

  document
    .querySelector('#login-btn')
    .addEventListener('submit', loginFormHandler);