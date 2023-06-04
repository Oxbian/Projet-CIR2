// var playlists = document.getElementById("logo-morceau1");

const boxes = document.querySelectorAll(".box");
var container = document.getElementById("liste-morceau1");

// playlists.addEventListener("click", function () {
//   window.location.href = "playlists.html";
// });
container.addEventListener("wheel", checkBoxes);

checkBoxes();

function checkBoxes() {
  const triggerBottom = (window.innerHeight / 10) * 6;
  boxes.forEach((box, index) => {
    box.addEventListener("click", function () {
      box.classList.add("go");
      const del = document.createElement("div");
      del.classList.add("delete");
      box.appendChild(del);
      del.addEventListener("click", function () {
        // Supprime la box (élément parent) de l'élément carré rouge
        var box = this.parentNode;
        box.remove();
      });

      const rect = document.createElement("div");
      rect.classList.add("blue-rect");
      box.appendChild(rect);

      boxes.forEach((otherBox, otherIndex) => {
        // Vérifie si la boîte est différente de celle cliquée
        if (otherBox == box) {
          otherBox.classList.remove("go2");
          otherBox.classList.remove("go3");
        }
        if (otherBox !== box) {
          // Supprime la classe "go" et "go2" des autres boîtes
          otherBox.classList.remove("go");
          otherBox.classList.remove("go2");
          otherBox.classList.remove("go3");
          const del = otherBox.querySelector(".delete");
          if (del) {
            del.remove();
          }

          const rect = otherBox.querySelector(".blue-rect");
          if (rect) {
            rect.remove();
          }
        }
        if (otherIndex === index - 1) {
          otherBox.classList.add("go2");
          otherBox.classList.remove("go3");
        }

        // Vérifie la boîte en dessous
        if (otherIndex === index + 1) {
          otherBox.classList.add("go2");
          otherBox.classList.remove("go3");
        }

        if (otherIndex === index - 2) {
          otherBox.classList.add("go3");
          otherBox.classList.remove("go2");
        }

        // Vérifie la boîte en dessous
        if (otherIndex === index + 2) {
          otherBox.classList.add("go3");
          otherBox.classList.remove("go2");
        }
      });
    });
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}
function clickbutton() {
  console.log("yo");
}
