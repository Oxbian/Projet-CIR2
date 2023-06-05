var circle = document.getElementById("circle");
var rect1 = document.getElementById("rect1");
var rect2 = document.getElementById("rect2");
var rect3 = document.getElementById("rect3");

circle.addEventListener("click", function () {
  circle.classList.toggle("clicked");
  var isVisible = rect1.classList.toggle("visible");
  rect2.classList.toggle("visible");
  rect3.classList.toggle("visible");

  if (isVisible) {
    rect1.addEventListener("click", function () {
      // if (rect1.style.opacity === "1") {
      console.log("super");
      window.location.href = "mesMorceaux.html";
      // }
    });
  }
  if (isVisible) {
    rect2.addEventListener("click", function () {
      // if (rect1.style.opacity === "1") {
      console.log("super");
      window.location.href = "mesPlaylists.html";
      // }
    });
  }
  if (isVisible) {
    rect3.addEventListener("click", function () {
      // if (rect1.style.opacity === "1") {
      console.log("super");
      window.location.href = "playlists.html";
      // }
    });
  }
});

