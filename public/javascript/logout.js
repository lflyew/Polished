const logoutHandler = async (event) => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out');
    }
};

document
.getElementById('logout-nav-btn')
.addEventListener('click', logoutHandler);