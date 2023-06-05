// const boxes = document.querySelectorAll('.box');

/**
 * Fonction pour afficher le nom de l'artiste
 * @param {*} data Informations de l'artiste
 */
function loadArtistInfo(data) {
  const artiste = document.getElementById('artiste-info');
  if (artiste) {
    artiste.innerHTML = `<p>Artiste : ${data.nom} ${data.prenom}</p>`;
  }
}

/**
 * Fonction pour afficher le nom de l'album
 * @param {*} data Informations de l'album
 */
function loadAlbumInfo(data) {
  const albumNom = document.getElementById('album-nom');
  if (albumNom) {
    albumNom.innerHTML = `<p>Album : ${data.titre}</p>`;
  }
  ajaxRequest('GET', `../php/request.php/artist/${data.id_artiste}`, loadArtistInfo);
}

/**
 * Charge une musique écoutée
 * @param {*} data Informations des musiques écoutées
 */
function loadListenedMusic(data) {
  const listeMorceau = document.getElementById('liste-morceau1');
  if (listeMorceau) {
    listeMorceau.innerHTML = '';
    for (let index = 0; index < data.length; index += 1) {
      if (index === 0) {
        listeMorceau.innerHTML += `<div class="box show"><h2>${data[index].titre}</h2><h2>${data[index].duree}</h2></div>`;
        ajaxRequest('GET', `../php/request.php/album/${data[index].id_album}`, loadAlbumInfo);
      } else {
        listeMorceau.innerHTML += `<div class="box"><h2>${data[index].titre}</h2><h2>${data[index].duree}</h2></div>`;
      }
    }
    boxes = document.querySelectorAll('.box');
  }
}

// checkBox();
let boxes;
/**
 * Fonction pour charger les musiques écoutées appelé par le bouton du menu
 */
function loadListened() {
  document.getElementById('main').innerHTML = `<div class="container"><div class="info"><div class="artisteAlbum"><div class="artiste" id="artiste" data-artiste="">
  </div><div class="album" id="album-nom" data-album="">Album :</div></div><div class="rectInfo" id="artiste-info"></div></div><div id="liste-morceau1">
  </div></div>`;

  // Ajout des évènements sur les boutons
  const artisteId = document.getElementById('artiste').dataset.artiste;
  // document.getElementById('artiste').addEventListener('click', loadArtiste, artisteId);

  const albumId = document.getElementById('artiste').dataset.album;
  // document.getElementById('artiste').addEventListener('click', loadAlbum, albumId);

  let container = document.getElementById('liste-morceau1');
 
  // Chargement des musiques écoutées
  ajaxRequest('GET', '../php/request.php/listened', loadListenedMusic);
  if (container) {
    container.addEventListener('wheel', checkBox);
  }
}

function checkBox() {
  const triggerBottom = (window.innerHeight / 10) * 6;
  boxes.forEach((box, index) => {
    console.log("yo");
    box.addEventListener('click', () => {
      box.classList.add('go');
      console.log('yop');
      const child = box.childNodes;
      console.log(child);
      if (child.length === 3) {
        console.log('salut');
      }
      if (child.length === 2) {
        const rect = document.createElement('div');
        rect.classList.add('blue-rect');
        box.appendChild(rect);
      }
      boxes.forEach((otherBox, otherIndex) => {
        // Vérifie si la boîte est différente de celle cliquée
        if (otherBox === box) {
          otherBox.classList.remove('go2');
          otherBox.classList.remove('go3');
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
