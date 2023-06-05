let add = document.querySelector(".addP");
function loadPlaylists() {
  document.getElementById(
    "main"
  ).innerHTML = `<div class="container"><div class="artiste"></div><div class="addP"></div><div id="liste-morceau1"><div class="box show"><h2>contenue</h2></div><div class="box"><h2>contenue</h2></div><div class="box"><h2>contenue</h2></div></div></div>`;

  boxes = document.querySelectorAll(".box");
  container = document.getElementById("liste-morceau1");
  add = document.querySelector(".addP");

  if (artist) {
    artist.addEventListener("click", loadRecherche);
  }

  if (container) {
    container.addEventListener("wheel", checkBoxe);
  }
  
}

// if (addP) {
  add.addEventListener("click", function () {
    console.log("belle fesse mathys");
    var newBox = document.createElement("div");
    newBox.classList.add("box");
  
    container.appendChild(newBox);
    boxes = document.querySelectorAll(".box");
    console.log("coucou");
  });

checkBoxe();

function checkBoxe() {
  const triggerBottom = (window.innerHeight / 10) * 6;
  boxes.forEach((box, index) => {
    box.addEventListener("click", function () {
      box.classList.add("go");

      var child = box.childNodes;
      console.log(child);
      if (child.length !== 1) {
        console.log("salut");
      }
      if (child.length == 1) {
        const rect = document.createElement("div");
        rect.classList.add("grey-rect");
        box.appendChild(rect);
        const del = document.createElement("div");
        del.classList.add("delete");
        box.appendChild(del);
        del.addEventListener("click", function () {
          // Supprime la box (élément parent) de l'élément carré rouge
          var box = this.parentNode;
          box.remove();
        });
      }
      // const add = document.createElement("div");
      // add.classList.add("addP");
      // box.appendChild(add);

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

          const add = otherBox.querySelector(".addP");
          if (add) {
            add.remove();
          }

          const rect = otherBox.querySelector(".grey-rect");
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
