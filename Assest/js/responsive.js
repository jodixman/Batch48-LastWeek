// Menangkap elemen dengan class "toggle-menu"
const toggleMenu = document.querySelector(".toggle-menu");

// Menangkap elemen dengan class "merah"
const merah = document.querySelector(".merah");

// Menambahkan event listener untuk saat "toggle-menu" diklik
toggleMenu.addEventListener("click", function() {
  // Menambahkan/ Menghapus class "merah" pada elemen
  merah.classList.toggle("merah");
  
  // Mengganti ikon "fa-bars" dengan "fa-xmark"
  toggleMenu.classList.toggle("fa-bars");
  toggleMenu.classList.toggle("fa-xmark");
});


