function checkBoxes() {
  const triggerBottom = (window.innerHeight / 10) * 6;
  boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      box.classList.add('go');

      const child = box.childNodes;
      console.log(child);
      if (child.length !== 1) {
        // window.location.href = "playlists.html";
        console.log('yo');
      }
      if (child.length === 1) {
        rect = document.createElement('div');
        rect.classList.add('red-rect');
        box.appendChild(rect);
      }

      boxes.forEach((otherBox, otherIndex) => {
        // Vérifie si la boîte est différente de celle cliquée
        if (otherBox == box) {
          otherBox.classList.remove('go2');
          otherBox.classList.remove('go3');
          // otherBox.addEventListener("click", () => {
          //   window.location.href = "playlists.html";
          // });
        }
        if (otherBox !== box) {
          // Supprime la classe "go" et "go2" des autres boîtes
          otherBox.classList.remove('go');
          otherBox.classList.remove('go2');
          otherBox.classList.remove('go3');

          rect = otherBox.querySelector('.red-rect');
          if (rect) {
            rect.remove();
          }
        }
        if (otherIndex === index - 1) {
          otherBox.classList.add('go2');
          otherBox.classList.remove('go3');
        }

        // Vérifie la boîte en dessous
        if (otherIndex === index + 1) {
          otherBox.classList.add('go2');
          otherBox.classList.remove('go3');
        }

        if (otherIndex === index - 2) {
          otherBox.classList.add('go3');
          otherBox.classList.remove('go2');
        }

        // Vérifie la boîte en dessous
        if (otherIndex === index + 2) {
          otherBox.classList.add('go3');
          otherBox.classList.remove('go2');
        }
      });
    });
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });
}

function clickbutton() {
  console.log('yo');
}

/**
 * Fonction pour charger la page de recherche
 */
function loadRecherche() {
  document.getElementById('main').innerHTML = `<div class="container"><div class="info"><div class="cherche"><div class="artiste"></div>
  <div class="album text">Album</div><div class="morceau text">Morceau</div><div class="nom text">Titre</div></div></div><div id="liste-morceau1">
  <div class="box show"><h2>contenue</h2></div><div class="box"><h2>contenue</h2></div><div class="box"><h2>contenue</h2></div></div></div>`;

  // Récupération des éléments
  let album = document.querySelector('.album');
  let morceau = document.querySelector('.morceau');
  let artist = document.querySelector('.nom');
  let rect = document.querySelector('.blue-rect');
  let boxes = document.querySelectorAll('.box');
  let container = document.getElementById('liste-morceau1');

  // Ajout des événements
  if (album) {
    album.addEventListener('click', loadRecherche);
  }
  if (morceau) {
    morceau.addEventListener('click', loadRecherche);
  }
  if (artist) {
    artist.addEventListener('click', loadRecherche);
  }
  if (container) {
    container.addEventListener('wheel', checkBoxes);
  }
  checkBoxes();
}
