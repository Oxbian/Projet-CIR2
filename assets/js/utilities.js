/**
 * Fonction pour demander le chargement de la page d'un artiste
 * @param {*} artisteId Id de l'artiste à charger
 */
function loadArtiste(artisteId) {
  loadGroupPage(`../php/request.php/artist/albums/${artisteId}`, 'Artiste');
}

/**
 * Fonction pour demander le chargement la page d'un album
 * @param {*} albumId Id de l'album à charger
 */
function loadAlbum(albumId) {
  loadGroupPage(`../php/request.php/album/tracks/${albumId}`, 'Album');
}

/**
 * Fonction pour afficher le nom de l'artiste
 * @param {*} data Informations de l'artiste
 */
function loadArtistInfo(data) {
  // Récupération des éléments
  const artisteInfo = document.getElementById('artiste-info');
  const artiste = document.getElementById('artiste');

  // Ajout des informations
  if (artisteInfo) {
    artisteInfo.innerHTML = `<p>Artiste : ${data.nom} ${data.prenom}<br>Type: ${data.type}</p>`;
  }
  if (artiste) {
    artiste.onclick = () => {loadArtiste(data.id);};
  }
}

/**
 * Fonction pour afficher le nom de l'album
 * @param {*} data Informations de l'album
 */
function loadAlbumInfo(data) {
  // Récupération de l'album et ajout des infos
  const albumNom = document.getElementById('album');
  // Modification onclick album
  if (albumNom) {
    albumNom.innerHTML = `<p>Album : ${data.titre}<br>Date parution: ${formatDate(data.date_parution)}</p>`;
    albumNom.onclick = () => {loadAlbum(data.id);};
  }

  // Chargement des informations de l'artiste de l'album
  ajaxRequest('GET', `../php/request.php/artist/${data.id_artiste}`, loadArtistInfo);
}

/**
 * Fonction pour charger un morceau dans une page
 * @param {*} id Id du morceau à charger
 */
function loadTrack(id) {
  const audio = document.getElementById('player');

  // Chargement de l'album contenant le morceau actuel & de l'artiste du morceau
  ajaxRequest('GET', `../php/request.php/track/${id}`, (data) => {
    // Lancement de l'audio
    document.getElementById('musique').src = `../assets/musique/${data.chemin}`;
    audio.load();
    document.querySelector('.total-time').innerHTML = formatTime(data.duree);
    document.querySelector('.current-time').innerHTML = '0:00';
    document.getElementById('text').textContent = data.titre;

    audio.play();

    // Ajout du click qui permet d'ajouter le morceau dans la playlist
    document.getElementById('add').onclick = null;
    document.getElementById('add').onclick = () => {addTrack(id);};

    // Ajout du morceau dans les favoris
    ajaxRequest('GET', '../php/request.php/playlist/checkfav', (data) => {setFav(id, data);}, `id_morceau=${id}`);

    // Ajout du morceau dans les musiques écoutées
    ajaxRequest('POST', '../php/request.php/listened', null, `id_morceau=${id}`);

    // Chargement des informations de l'album et de l'artiste du morceau
    ajaxRequest('GET', `../php/request.php/album/${data.id_album}`, loadAlbumInfo);
  });
}

/**
 * Fonction pour demander le chargement d'une playlist
 * @param {*} playlistId Id de la playlist à charger
 * @param {*} playlistName Nom de la playlist à charger
 */
function loadTrackPageEvent(playlistId, playlistName) {
  loadTrackPage(`../php/request.php/playlist/tracks/${playlistId}`, `${playlistName}`);
}

/**
 * Fonction pour charger une liste d'objets dans une page (musiques, playlists, albums)
 * @param {*} data Informations des musiques écoutées
 * @param {*} playlistId Id de la playlist à charger
 * @param {*} playlistName Nom de la playlist à charger
 */
function loadObjects(data, playlistId = null, playlistName = null) {
  // Récupération du parent des objets à charger
  const listeObjet = document.getElementById('liste-morceau1');

  // Si on n'a pas de donnée à charger, on fait rien
  if (data === false || data.length === 0) {
    return;
  }

  if (listeObjet) {
    listeObjet.innerHTML = '';
    for (let index = 0; index < data.length; index += 1) {
      // Vérification s'il s'agit de l'élément à afficher ou non
      if (index === 0) {
        // Vérification s'il s'agit d'un artiste (.type), d'une playlist (.nom),
        // d'un album (.date_parution) ou de musiques
        if (data[index].type) {
          listeObjet.innerHTML += `<div class="box show" onclick="loadTrackPageEvent(${data[index].id}, 'Artiste')"><h2>${data[index].nom} ${data[index].prenom}</h2></div>`;
        } else if (data[index].nom) {
          listeObjet.innerHTML += `<div class="box show" onclick="loadTrackPageEvent(${data[index].id}, '${data[index].nom}')"><h2>${data[index].nom}</h2></div>`;
        } else if (data[index].date_parution) {
          listeObjet.innerHTML += `<div class="box show" onclick="loadAlbum(${data[index].id})"><h2>${data[index].titre}</h2></div>`;

          // Chargement des infos de l'artiste actuel
          ajaxRequest('GET', `../php/request.php/artist/${data[index].id_artiste}`, loadArtistInfo);
        } else {
          if (playlistId) {
            listeObjet.innerHTML += `<div id="delete-track" onclick="deleteTrack(${data[index].id}, ${playlistId}, '${playlistName}')"><div class="box show" onclick="loadTrack(${data[index].id})"><h2>${data[index].titre}</h2><h2>${formatTime(data[index].duree)}</h2></div></div>`;
          } else {
            listeObjet.innerHTML += `<div class="box show" onclick="loadTrack(${data[index].id})"><h2>${data[index].titre}</h2><h2>${formatTime(data[index].duree)}</h2></div>`;
          }
          // Chargement des infos de l'album du morceau actuel
          ajaxRequest('GET', `../php/request.php/album/${data[index].id_album}`, loadAlbumInfo);
        }
      } else {
        // Vérification s'il s'agit d'un artiste (.type), d'une playlist (.nom),
        // d'un album (.date_parution) ou de musiques
        // eslint-disable-next-line no-lonely-if
        if (data[index].type) {
          listeObjet.innerHTML += `<div class="box" onclick="loadTrackPageEvent(${data[index].id},'Artiste'"><h2>${data[index].nom} ${data[index].prenom}</h2></div>`;
        } else if (data[index].nom) {
          listeObjet.innerHTML += `<div class="box" onclick="loadTrackPageEvent(${data[index].id}, '${data[index].nom}')"><h2>${data[index].nom}</h2></div>`;
        } else if (data[index].date_parution) {
          listeObjet.innerHTML += `<div class="box show" onclick="loadAlbum(${data[index].id})"><h2>${data[index].titre}</h2></div>`;
        } else if (playlistId) {
          listeObjet.innerHTML += `<div id="delete-track" onclick="deleteTrack(${data[index].id}, ${playlistId}, '${playlistName}')"><div class="box" onclick="loadTrack(${data[index].id})"><h2>${data[index].titre}</h2><h2>${formatTime(data[index].duree)}</h2></div></div>`;
        } else {
          listeObjet.innerHTML += `<div class="box" onclick="loadTrack(${data[index].id})"><h2>${data[index].titre}</h2><h2>${formatTime(data[index].duree)}</h2></div>`;
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

  // Si c'est la playlist des favoris
  if (pageTitle === 'Favoris' && request.includes('../php/request.php/playlist/tracks/')) {
    loadFavorites();
    return;
  }

  // Vérification si on charge une playlist ou non
  if (request.includes('../php/request.php/playlist/tracks/')) {
    const playlistId = request.split('/')[5];
    // Chargement du contenu de la page
    document.getElementById('main').innerHTML = `<h2>${pageTitle}</h2><div id="delete-btn" onclick="deletePlaylist(${playlistId})"></div><div id="update-btn" onclick="updatePlaylist(${playlistId})"></div>
    <div class="container"><div class="info"><div class="artisteAlbum"><div class="artiste" id="artiste"></div><div class="album" id="album">
    </div></div><div class="rectInfo" id="artiste-info"></div></div><div id="liste-morceau1">
    </div></div>`;

    // Chargement des éléments
    ajaxRequest('GET', request, (data) => { loadObjects(data, playlistId, pageTitle); });
  } else {
    document.getElementById('main').innerHTML = `<h2>${pageTitle}</h2><div class="container"><div class="info"><div class="artisteAlbum"><div class="artiste" id="artiste">
      </div><div class="album" id="album"></div></div><div class="rectInfo" id="artiste-info"></div></div><div id="liste-morceau1">
      </div></div>`;

    // Chargement des éléments
    ajaxRequest('GET', request, loadObjects);
  }

  const container = document.getElementById('liste-morceau1');
  if (container) {
    container.addEventListener('wheel', checkBox);
  }

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
    html += '<div class="addP" id="add-btn" onclick="createPlaylist()"></div><div id="liste-morceau1"></div></div>';
    main.innerHTML = html;
  } else if (pageTitle === 'Artiste') {
    html += `<div class="info"><div class="artisteAlbum"><div class="artiste" id="artiste"></div></div>
    <div class="rectInfo" id="artiste-info"></div></div><div id="liste-morceau1"></div></div>`;
    main.innerHTML = html;
  } else if (pageTitle === 'Album') {
    html += `<div class="info"><div class="artisteAlbum"><div class="artiste" id="artiste">
    </div><div class="album" id="album"></div></div><div class="rectInfo" id="artiste-info"></div></div><div id="liste-morceau1">
    </div></div>`;
    main.innerHTML = html;
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
