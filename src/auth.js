// Handle login
document.getElementById('loginBtn').addEventListener('click', function () {
  localStorage.setItem('isLoggedIn', 'true');
  alert('Logged in!');
  window.location.href = 'index.html';
});
