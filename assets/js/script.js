var home = document.getElementById("home");
var search = document.getElementById("rechercheIcon");

home.addEventListener("click", function () {
  window.location.href = "accueil.html";
});

search.addEventListener("click", function () {
  window.location.href = "rechercheAlbum.html";
});
