let add;

/**
 * Fonction pour charger les musiques d'une playlist
 * @param {*} event Evènement de clique du bouton
 */
function loadPlaylist(event) {
  console.log(`Playlist ${event.currentTarget.playlistId}`);
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
  ajaxRequest('GET', `../php/request.php/playlist/tracks/${event.currentTarget.playlistId}`, loadListenedMusic);
  if (container) {
    container.addEventListener('wheel', checkBox);
  }
}

/**
 * Fonction pour charger les playlists de l'utilisateur
 * @param {*} data Liste des playlists de l'utilisateur
 */
function loadPlaylistsUser(data) {
  const listeMorceau = document.getElementById('liste-morceau1');
  if (listeMorceau) {
    listeMorceau.innerHTML = '';

    // Ajouts des playlists la première est affichée
    for (let index = 0; index < data.length; index += 1) {
      if (index === 0) {
        listeMorceau.innerHTML += `<div class="box show" id="playlist${data[index].id}"><h2>${data[index].nom}</h2></div>`;
        document.getElementById(`playlist${data[index].id}`).addEventListener('click', loadPlaylist);
        document.getElementById(`playlist${data[index].id}`).playlistId = `${data[index].id}`;
      } else {
        listeMorceau.innerHTML += `<div class="box" id="playlist${data[index].id}"><h2>${data[index].nom}</h2></div>`;
        document.getElementById(`playlist${data[index].id}`).addEventListener('click', loadPlaylist, data[index].id);
        document.getElementById(`playlist${data[index].id}`).playlistId = `${data[index].id}`;
      }
    }
    boxes = document.querySelectorAll('.box');
  }
}

/**
 * Fonction pour créer une playlist
 */
function createPlaylist() {
  const nom = window.prompt('Nom de la playlist :');
  ajaxRequest('POST', '../php/request.php/playlist', () => { ajaxRequest('GET', '../php/request.php/playlist/user', loadPlaylistsUser); }, `nom_playlist=${nom}`);
}

/**
 * Fonction pour afficher les playlists de l'utilisateur
 */
function loadPlaylists() {
  // Si l'utilisateur n'est pas identifié
  if (Cookies.get('token') === null) {
    return;
  }
  document.getElementById('main').innerHTML = '<div class="container"><div class="addP"></div><div id="liste-morceau1"></div></div>';

  // Récupération des éléments
  const container = document.getElementById('liste-morceau1');
  const add = document.querySelector('.addP');

  // Ajout des évènements sur les boutons
  /*
  if (container) {
    container.addEventListener('wheel', checkBoxes);
  }*/
  if (add) {
    add.addEventListener('click', createPlaylist);
  }

  // Chargement des playlists
  ajaxRequest('GET', '../php/request.php/playlist/user', loadPlaylistsUser);
}

/**
 * Fonction pour afficher les morceaux favoris de l'utilisateur
 */
function loadFavorites() {
  loadTrackPage('../php/request.php/playlist/favoris', 'Favoris');
}

function checkBoxe() {
  const triggerBottom = (window.innerHeight / 10) * 6;
  boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      box.classList.add('go');

      const child = box.childNodes;
      console.log(child);
      if (child.length !== 1) {
        console.log('salut');
      }
      if (child.length == 1) {
        const rect = document.createElement('div');
        rect.classList.add('grey-rect');
        box.appendChild(rect);
        const del = document.createElement('div');
        del.classList.add('delete');
        box.appendChild(del);
        del.addEventListener('click', function () {
          // Supprime la box (élément parent) de l'élément carré rouge
          const box = this.parentNode;
          box.remove();
        });
      }
      // const add = document.createElement("div");
      // add.classList.add("addP");
      // box.appendChild(add);

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
          const del = otherBox.querySelector('.delete');
          if (del) {
            del.remove();
          }

          const add = otherBox.querySelector('.addP');
          if (add) {
            add.remove();
          }

          const rect = otherBox.querySelector('.grey-rect');
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