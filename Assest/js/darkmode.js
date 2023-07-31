const navbarLogo = document.querySelector('.navbar-logo');
navbarLogo.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  navbarLogo.querySelector('i').classList.toggle('fa-moon');
  navbarLogo.querySelector('i').classList.toggle('fa-sun');

  // Menyimpan status dark mode saat toggle di klik
  const isDarkMode = document.body.classList.contains('dark-mode');
  saveDarkModePreference(isDarkMode);
}

// Memeriksa status dark mode saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  toggleDarkMode(isDarkMode);
});

// Menyimpan status dark mode saat toggle di klik
function saveDarkModePreference(isDarkMode) {
  localStorage.setItem('darkMode', isDarkMode);
}




