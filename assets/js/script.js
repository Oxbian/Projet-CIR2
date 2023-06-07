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

// Récupération des éléments
const home = document.getElementById('home');
const search = document.getElementById('recherche-icon');
const settings = document.getElementById('param');

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
