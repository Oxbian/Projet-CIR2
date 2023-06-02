var album = document.getElementById("logoAlbum");
var morceau = document.getElementById("logoMorceau");
var artist = document.getElementById("logoArtiste");

// album.addEventListener("click", function () {
//   console.log("super");
//   window.location.href = "rechercheAlbum.html";
// });

album.addEventListener("click", function () {
  window.location.href = "rechercheAlbum.html";
});

morceau.addEventListener("click", function () {
  window.location.href = "rechercheMorceau.html";
});

artist.addEventListener("click", function () {
  window.location.href = "rechercheArtiste.html";
});
