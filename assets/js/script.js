/**
 * Fonction pour formater le temps
 * @param {*} time Temps à formatter
 * @returns Temps formaté en minutes : secondes
 */
function formatTime(time) {
  const times = time.split('.');
  return `${times[0]}:${times[1].substring(0, times[1].length - 1)}`;
}

/**
 * Fonction pour formatter une date en jj/mm/aaaa
 * @param {*} date Date à formatter
 * @returns Date formatée en jj/mm/aaaa
 */
function formatDate(date) {
  const dates = date.split('-');
  return `${dates[2]}/${dates[1]}/${dates[0]}`;
}

/**
 * Fonction pour ajouter une musique à une playlist
 */
function addTrack() {
  const id = document.getElementById('player').dataset.musiqueid;
  // Récupération de l'id de la playlist
  const nom_playlist = window.prompt('Nom de la playlist où ajouter le morceau: ');
  ajaxRequest('GET', '../php/request.php/playlist/search', (data) => {
    ajaxRequest('POST', '../php/request.php/playlist/track', null, `id_morceau=${id}&id_playlist=${data.id}`);
  }, `nom_playlist=${nom_playlist}`);
}

/**
 * Fonction pour liker une musique
 */
function likeTrack() {
  const id = document.getElementById('player').dataset.musiqueid;
  ajaxRequest('GET', '../php/request.php/playlist/favorisid', (data) => {
    console.log(data);
    ajaxRequest('POST', '../php/request.php/playlist/track', null, `id_morceau=${id}&id_playlist=${data.id}`);
  });
}

// Récupération des éléments
const home = document.getElementById('home');
const search = document.getElementById('recherche-icon');
const settings = document.getElementById('param');
const like = document.getElementById('like');
const add = document.getElementById('add');

// Gestion des évènements
if (home) {
  home.addEventListener('click', loadAccueil);
}
if (search) {
  search.addEventListener('click', loadRecherche);
}
if (settings) {
  settings.addEventListener('click', loadSettings);
}
if (like) {
  like.addEventListener('click', likeTrack);
}
if (add) {
  add.addEventListener('click', addTrack);
}
