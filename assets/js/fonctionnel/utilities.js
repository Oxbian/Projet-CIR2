function loadArtiste() {
  const artisteId = document.getElementById('artiste').dataset.artiste;
  console.log(artisteId);
}

function loadAlbum() {
  const albumId = document.getElementById('album').dataset.album;
  console.log(albumId);
}
/**
 * Fonction pour afficher le nom de l'artiste
 * @param {*} data Informations de l'artiste
 */
function loadArtistInfo(data) {
  let artiste = document.getElementById('artiste-info');
  if (artiste) {
    artiste.innerHTML = `<p>Artiste : ${data.nom} ${data.prenom}</p>`;
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
    albumNom.innerHTML = `<p>Album : ${data.titre}</p>`;
    albumNom.dataset.album = data.id;
  }
  ajaxRequest('GET', `../php/request.php/artist/${data.id_artiste}`, loadArtistInfo);
}

/**
 * Fonction pour charger une musique dans une page
 *
 * @param {*} event Objet musique sur laquelle l'utilisateur a cliqué
 */
function loadTrack(event) {
  console.log('Clicked on track' + event.currentTarget.trackId);
  const trackId = event.currentTarget.trackId;

  // TODO: Jouer le morceau

  // Chargement de l'album content le morceau actuel & de l'artiste du morceau
  ajaxRequest('GET', `../php/request.php/track/${trackId}`, (data) => {
    ajaxRequest('GET', `../php/request.php/album/${data.id_album}`, loadAlbumInfo);
  });
}

/**
 * Fonction pour charger une liste de musique dans une page
 * @param {*} data Informations des musiques écoutées
 */
function loadTracks(data) {
  const listeMorceau = document.getElementById('liste-morceau1');

  // Si on n'a pas de donnée à charger, on fait rien
  if (data === false || data.length === 0) {
    return;
  }

  if (listeMorceau) {
    listeMorceau.innerHTML = '';
    for (let index = 0; index < data.length; index += 1) {
      // Vérification s'il s'agit du morceau à afficher ou non
      if (index === 0) { // TODO: Ajouter bouton pour favoris une musique
        listeMorceau.innerHTML += `<div class="box show" id="morceau${data[index].id}"><h2>${data[index].titre}</h2><span>${data[index].duree}</span></div>`;
        // Chargement des infos de l'album du morceau actuel
        ajaxRequest('GET', `../php/request.php/album/${data[index].id_album}`, loadAlbumInfo);
      } else {
        listeMorceau.innerHTML += `<div class="box" id="morceau${data[index].id}"><h2>${data[index].titre}</h2><span>${data[index].duree}</span></div>`;
      }

      // Ajout de l'évènement sur le morceau
      const morceau = document.getElementById(`morceau${data[index].id}`);
      if (morceau) {
        // TODO: vérifier que le bouton clique bien
        morceau.addEventListener('click', loadTrack);
        morceau.trackId = data[index].id;
      }
    }
  }
}

/**
 * Fonction pour la page d'une liste de musique
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

  let container = document.getElementById('liste-morceau1');

  // Chargement des éléments
  ajaxRequest('GET', request, loadTracks);
  /**if (container) {
    container.addEventListener('wheel', checkBox);
  }*/
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
}
