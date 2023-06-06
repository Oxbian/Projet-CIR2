/**
 * Fonction pour rechercher les morceaux correspondant
 */
function searchMorceau() {
  // Récupération des éléments correspondants à la recherche
  const input = document.getElementById('search-input').value;
  const data = `nom_morceau=${input}`;
  ajaxRequest('GET', `../php/request.php/track`, loadObjects, data);
}

/**
 * Fonction pour rechercher les albums correspondant
 */
function searchAlbum() {
  // Récupération des éléments correspondants à la recherche
  const input = document.getElementById('search-input').value;
  const data = `nom_album=${input}`;
  ajaxRequest('GET', `../php/request.php/album`, loadObjects, data);
}

/**
 * Fonction pour rechercher un artiste
 */
function searchArtist() {
  // Récupération des éléments correspondants à la recherche
  const input = document.getElementById('search-input').value;
  const data = `nom_artiste=${input}&prenom_artiste=${input}`;
  ajaxRequest('GET', `../php/request.php/artist`, loadObjects, data);
}

function loadRecherche() {
  document.getElementById('main').innerHTML = '<div class="container"><div class="info"><div class="cherche"><div class="artiste"></div><div class="album text">Album</div><div class="morceau text">Morceau</div><div class="nom text">Titre</div></div></div><div id="liste-morceau1"></div></div>';

  // Récupération des éléments
  let album = document.querySelector('.album');
  let morceau = document.querySelector('.morceau');
  let artist = document.querySelector('.nom');

  // Ajout des événements
  if (album) {
    album.addEventListener('click', () => { document.getElementById('liste-morceau1').innerHTML = ''; searchAlbum(); });
  }
  if (morceau) {
    morceau.addEventListener('click', () => { document.getElementById('liste-morceau1').innerHTML = ''; searchMorceau(); });
  }
  if (artist) {
    artist.addEventListener('click', () => { document.getElementById('liste-morceau1').innerHTML = ''; searchArtist(); });
  }


  // container.addEventListener('wheel', checkBoxes);
  const container = document.getElementById('liste-morceau1');
  if (container) {
    container.addEventListener('wheel', checkBox);
  }

  searchMorceau();
  searchAlbum();
  searchArtist();
  // AJAX loadObjets pour les albums, artistes, musiques
}
