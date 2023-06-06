/**
 * Fonction pour demander le chargement de la page d'un artiste
 */
function loadArtiste() {
  const artisteId = document.getElementById('artiste').dataset.artiste;
  loadGroupPage(`../php/request.php/artist/albums/${artisteId}`, 'Artiste');
}

/**
 * Fonction pour demander le chargement la page d'un album
 */
function loadAlbum() {
  const albumId = document.getElementById('album').dataset.album;
  loadGroupPage(`../php/request.php/album/tracks/${albumId}`, 'Album');
}

/**
 * Fonction pour afficher le nom de l'artiste
 * @param {*} data Informations de l'artiste
 */
function loadArtistInfo(data) {
  let artiste = document.getElementById('artiste-info');
  if (artiste) {
    artiste.innerHTML = `<p>Artiste : ${data.nom} ${data.prenom}<br>Type: ${data.type}</p>`;
  }
  artiste = document.getElementById('artiste');
  if (artiste) {
    artiste.dataset.artiste = data.id;
  }
}

/**
 * Fonction pour afficher le nom de l'album
 * @param {*} data Informations de l'album
 */
function loadAlbumInfo(data) {
  const albumNom = document.getElementById('album');
  if (albumNom) {
    albumNom.innerHTML = `<p>Album : ${data.titre}<br>Date parution: ${data.date_parution}</p>`;
    albumNom.dataset.album = data.id;
  }
  ajaxRequest('GET', `../php/request.php/artist/${data.id_artiste}`, loadArtistInfo);
}

/**
 * Fonction pour charger une musique dans une page
 * @param {*} event Objet musique sur laquelle l'utilisateur à cliqué
 */
function loadTrack(event) {
  console.log(`Clicked on track${event.currentTarget.trackId}`);
  const { trackId } = event.currentTarget;
  // const player = document.getElementById('player');
  const audio = document.getElementById('player');
  // Chargement de l'album content le morceau actuel & de l'artiste du morceau
  ajaxRequest('GET', `../php/request.php/track/${trackId}`, (data) => {
    // Lancement de l'audio
    console.log(data);
    document.getElementById('musique').src = `../assets/musique/${data.chemin}`;
    audio.load();
    document.querySelector('.total-time').innerHTML = data.duree;
    document.querySelector('.current-time').innerHTML = '0:00';
    // console.log(data.duree);
    audio.play();
    ajaxRequest('GET', `../php/request.php/album/${data.id_album}`, loadAlbumInfo);
  });
}

/**
 * Fonction pour demander le chargement d'une playlist
 * @param {*} event Objet playlist sur lequel l'utilisateur à cliqué
 */
function loadTrackPageEvent(event) {
  console.log(`Clicked on playlist${event.currentTarget.playlistId}`);
  loadTrackPage(`../php/request.php/playlist/tracks/${event.currentTarget.playlistId}`, `${event.currentTarget.playlistName}`);
}

/**
 * Fonction pour charger une liste d'objets dans une page (musiques, playlists, albums)
 * @param {*} data Informations des musiques écoutées
 */

function loadObjects(data) {
  console.log(data);
  const listeObjet = document.getElementById('liste-morceau1');

  // Si on n'a pas de donnée à charger, on fait rien
  if (data === false || data.length === 0) {
    return;
  }

  if (listeObjet) {
    listeObjet.innerHTML = '';
    for (let index = 0; index < data.length; index += 1) {
      // Vérification s'il s'agit de l'élément à afficher ou non
      if (index === 0) { // TODO: Ajouter bouton pour favoris une musique
        // Vérification s'il s'agit d'une playlist, d'un artiste, d'un album ou de musiques
        if (data[index].nom && data[index].prenom) {
          listeObjet.innerHTML += `<div class="box show" id="${data[index].id}"><h2>${data[index].nom} ${data[index].prenom}</h2></div>`;
        } else if (data[index].nom) {
          listeObjet.innerHTML += `<div class="box show" id="${data[index].id}"><h2>${data[index].nom}</h2></div>`;
        } else if (data[index].date_parution) {
          listeObjet.innerHTML += `<div class="box show" id="${data[index].id}"><h2>${data[index].titre}</h2></div>`;
          // Chargement des infos de l'album actuel
          ajaxRequest('GET', `../php/request.php/album/${data[index].id}`, loadAlbumInfo);
        } else {
          listeObjet.innerHTML += `<div class="box show" id="${data[index].id}"><h2>${data[index].titre}</h2><h2>${data[index].duree}</h2></div>`;
          // Chargement des infos de l'album du morceau actuel
          ajaxRequest('GET', `../php/request.php/album/${data[index].id_album}`, loadAlbumInfo);
        }
      } else if (data[index].nom && data[index].prenom) {
        listeObjet.innerHTML += `<div class="box show" id="${data[index].id}"><h2>${data[index].nom} ${data[index].prenom}</h2></div>`;
      } else if (data[index].nom || data[index].type) {
        listeObjet.innerHTML += `<div class="box" id="${data[index].id}"><h2>${data[index].nom}</h2></div>`;
      } else {
        listeObjet.innerHTML += `<div class="box" id="${data[index].id}"><h2>${data[index].titre}</h2><h2>${data[index].duree}</h2></div>`;
      }

      // Ajout de l'évènement sur l'objet
      const objet = document.getElementById(`${data[index].id}`);
      if (objet) { // TODO: vérifier que le bouton clique bien
        // Si c'est une playlist alors on charge les musiques de la playlist
        if (data[index].nom) {
          objet.addEventListener('click', loadTrackPageEvent);
          objet.playlistId = data[index].id;
          objet.playlistName = data[index].nom;
        } else if (data[index].type) { // Si on charge un artiste
          objet.addEventListener('click', loadAlbumInfo);
          objet.albumId = data[index].id;
        } else { // sinon on charge une musique
          objet.addEventListener('click', loadTrack);
          objet.trackId = data[index].id;
        }
      }
    }
  }
}

/**
 * Fonction pour charger une page avec une liste de musique
 * @param {*} request Requête Ajax à effectuer
 * @param {*} pageTitle Titre de la page
 */
function loadTrackPage(request, pageTitle) {
  // Si l'utilisateur n'est pas identifié
  if (Cookies.get('token') === null) {
    return;
  }
  document.getElementById('main').innerHTML = `<h2>${pageTitle}</h2><div class="container"><div class="info"><div class="artisteAlbum"><div class="artiste" id="artiste" data-artiste="">
    </div><div class="album" id="album" data-album=""></div></div><div class="rectInfo" id="artiste-info"></div></div><div id="liste-morceau1">
    </div></div>`;

  // Ajout des évènements sur les boutons;
  document.getElementById('artiste').addEventListener('click', loadArtiste);
  document.getElementById('album').addEventListener('click', loadAlbum);

  const container = document.getElementById('liste-morceau1');
  if (container) {
    container.addEventListener('wheel', checkBox);
  }

  // Chargement des éléments
  ajaxRequest('GET', request, loadObjects);
}

/**
 * Fonction pour charger une page groupe (Album, playlist..)
 * @param {*} request Requête Ajax à effectuer
 * @param {*} pageTitle Titre de la page
 */
function loadGroupPage(request, pageTitle) {
  // Si l'utilisateur n'est pas identifié
  if (Cookies.get('token') === null) {
    return;
  }

  // Chargement du contenu de la page
  const main = document.getElementById('main');
  let html = `<h2>${pageTitle}</h2><div class="container">`;

  if (pageTitle === 'Playlists') {
    html += '<div class="addP" id="addP"></div><div id="liste-morceau1"></div></div>';
    main.innerHTML = html;

    // Ajout des évènements du bouton add
    const add = document.getElementById('addP');
    if (add) {
      add.addEventListener('click', createPlaylist);
    }
  } else if (pageTitle === 'Artiste') {
    console.log('Load Artiste');
    html += `<div class="info"><div class="artisteAlbum"><div class="artiste" id="artiste" data-artiste=""></div></div>
    <div class="rectInfo" id="artiste-info"></div></div><div id="liste-morceau1"></div></div>`;
    main.innerHTML = html;

    // Ajout des évènements sur les boutons;
    document.getElementById('artiste').addEventListener('click', loadArtiste);
  } else if (pageTitle === 'Album') {
    html = `<div class="container"><div class="info"><div class="artisteAlbum"><div class="artiste" id="artiste" data-artiste="">
    </div><div class="album" id="album" data-album=""></div></div><div class="rectInfo" id="artiste-info"></div></div><div id="liste-morceau1">
    </div></div>`;
    main.innerHTML = html;

    // Ajout des évènements sur les boutons;
    document.getElementById('artiste').addEventListener('click', loadArtiste);
    document.getElementById('album').addEventListener('click', loadAlbum);
  }

  const container = document.getElementById('liste-morceau1');
  if (container) {
    container.addEventListener('wheel', checkBox);
  }

  // Chargement des éléments
  ajaxRequest('GET', request, loadObjects);
}

function checkBox() {
  const boxes = document.querySelectorAll('.box');
  const triggerBottom = (window.innerHeight / 10) * 6;
  boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      box.classList.add('go');
      const child = box.childNodes;

      // console.log(child);
      if (child.length !== 3) {
        console.log('yop');
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
          const blueRect = otherBox.querySelector('.blue-rect');
          if (blueRect) {
            blueRect.remove();
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

function Play() {
  const audio = document.getElementById('player');
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}
