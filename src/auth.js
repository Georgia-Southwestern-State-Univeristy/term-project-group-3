// Handle login
document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');

  loginBtn.addEventListener('click', () => {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'index.html';
  });
});
