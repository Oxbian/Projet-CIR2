/**
 * Fonction pour afficher le nom de l'artiste
 * @param {*} data Informations de l'artiste
 */
function loadArtistInfo(data) {
  const artiste = document.getElementById('album-info');
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
  console.log(data[0].titre);
  const listeMorceau = document.getElementById('liste-morceau1');
  if (listeMorceau) {
    listeMorceau.innerHTML = '';
    for (let index = 0; index < data.length; index += 1) {
      if (index === 0) {
        listeMorceau.innerHTML += `<div class="box show"><h2>${data[index].titre}</h2><span>${data[index].duree}</span></div>`;
        ajaxRequest('GET', `../php/request.php/album/${data[index].id_album}`, loadAlbumInfo);
      } else {
        listeMorceau.innerHTML += `<div class="box"><h2>${data[index].titre}</h2><span>${data[index].duree}</span></div>`;
      }
    }
  }
}

/**
 * Fonction pour charger les musiques écoutées appelé par le bouton du menu
 */
function loadListened() {
  document.getElementById('main').innerHTML = `
  <div class="container"><div class="info"><div class="artisteAlbum"><div class="artiste"></div><div class="album" id="album-nom">Album :</div></div><div class="rectInfo" id="album-info"></div></div>
  <div id="liste-morceau1"></div></div>`;

  // Chargement des musiques écoutées
  ajaxRequest('GET', '../php/request.php/listened', loadListenedMusic);
}
