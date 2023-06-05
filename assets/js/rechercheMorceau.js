var album = document.querySelector(".album");
var morceau = document.querySelector(".morceau");
var artist = document.querySelector(".nom");
var rect = document.querySelector(".blue-rect");

album.addEventListener("click", function () {
  window.location.href = "rechercheAlbum.html";
});

morceau.addEventListener("click", function () {
  window.location.href = "rechercheMorceau.html";
});

artist.addEventListener("click", function () {
  window.location.href = "rechercheArtiste.html";
});

// rect.forEach((r) => {
//   r.addEventListener("click", function () {
//     window.location.href = "playlists.html";
//   });
// });

const boxes = document.querySelectorAll(".box");
var container = document.getElementById("liste-morceau1");

container.addEventListener("wheel", checkBoxes);

checkBoxes();

function checkBoxes() {
  const triggerBottom = (window.innerHeight / 10) * 6;
  boxes.forEach((box, index) => {
    box.addEventListener("click", function () {
      box.classList.add("go");

      // const rect = document.createElement("div");
      // rect.classList.add("blue-rect");
      // box.appendChild(rect);
      var child = box.childNodes;
      console.log(child);
      if (child.length !== 3) {
        console.log("salut");
      }
      if (child.length == 3) {
        const rect = document.createElement("div");
        rect.classList.add("blue-rect");
        box.appendChild(rect);
      }

      boxes.forEach((otherBox, otherIndex) => {
        // Vérifie si la boîte est différente de celle cliquée
        if (otherBox == box) {
          otherBox.classList.remove("go2");
          otherBox.classList.remove("go3");
          //   otherBox.addEventListener("click", function () {
          //     window.location.href = "rechercheArtiste.html";
          //   });
        }
        if (otherBox !== box) {
          // Supprime la classe "go" et "go2" des autres boîtes
          otherBox.classList.remove("go");
          otherBox.classList.remove("go2");
          otherBox.classList.remove("go3");

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
