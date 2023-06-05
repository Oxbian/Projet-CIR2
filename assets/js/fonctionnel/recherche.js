let album = document.querySelector('.album');
let morceau = document.querySelector('.morceau');
let artist = document.querySelector('.nom');
let rect = document.querySelector('.blue-rect');
let boxes = document.querySelectorAll('.box');
let container = document.getElementById('liste-morceau1');

function loadRecherche() {
  document.getElementById('main').innerHTML = `<div class="container"><div class="info"><div class="cherche"><div class="artiste"></div>
   <div class="album text">Album</div><div class="morceau text">Morceau</div><div class="nom text">Titre</div></div></div><div id="liste-morceau1">
   <div class="box show go"><div class="blue-rect"></div><h2>contenue</h2></div><div class="box go2"><h2>contenue</h2></div><div class="box">
   <h2>contenue</h2></div></div></div>`;

  console.log('yo');
  // Récupération des éléments
  album = document.querySelector('.album');
  morceau = document.querySelector('.morceau');
  artist = document.querySelector('.nom');
  rect = document.querySelector('.blue-rect');
  boxes = document.querySelectorAll('.box');
  container = document.getElementById('liste-morceau1');

  // Ajout des événements
  album.addEventListener('click', loadRecherche);
  morceau.addEventListener('click', loadRecherche);
  artist.addEventListener('click', loadRecherche);
  container.addEventListener('wheel', checkBoxes);
}

if (album) {
  album.addEventListener('click', loadRecherche);
}

if (morceau) {
  morceau.addEventListener('click', loadRecherche);
}

if (artist) {
  artist.addEventListener('click', loadRecherche);
}

// rect.forEach((r) => {
//   r.addEventListener("click", function () {
//     window.location.href = "playlists.html";
//   });
// });

if (container) {
  container.addEventListener('wheel', checkBoxes);
}

checkBoxes();

function checkBoxes() {
  const triggerBottom = (window.innerHeight / 10) * 6;
  boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      box.classList.add('go');

      const rect = document.createElement('div');
      rect.classList.add('blue-rect');
      box.appendChild(rect);

      boxes.forEach((otherBox, otherIndex) => {
        // Vérifie si la boîte est différente de celle cliquée
        if (otherBox == box) {
          otherBox.classList.remove('go2');
          otherBox.classList.remove('go3');
          otherBox.addEventListener('click', () => {
            window.location.href = 'playlists.html';
          });
        }
        if (otherBox !== box) {
          // Supprime la classe "go" et "go2" des autres boîtes
          otherBox.classList.remove('go');
          otherBox.classList.remove('go2');
          otherBox.classList.remove('go3');

          const rect = otherBox.querySelector('.blue-rect');
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