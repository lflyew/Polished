const logout = async () => {
    //making a post to our API  to logout
    const response = await fetch('/api/logout', {
      method: 'POST',
      //letting the server know that its json data
      headers: { 'Content-Type': 'application/json' }, 
    });
  
    if (response.ok) {
      //if the response is successful and user is logged out you take them back to the login page
      document.location.replace('/login');
    } else {
      alert('Failed to log out');
    }
  };
  
  document
  .querySelector('#logout-btn') 
  .addEventListener('click', logout);