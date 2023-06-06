/**
 * Fonction pour créer une playlist
 */
function createPlaylist() {
  const nom = window.prompt('Nom de la playlist :');
  if (nom != null && nom !== '') {
    ajaxRequest('POST', '../php/request.php/playlist', loadPlaylists, `nom_playlist=${nom}`);
  }
}

/**
 * Fonction pour afficher les playlists de l'utilisateur
 */
function loadPlaylists() {
  loadGroupPage('../php/request.php/playlist/user', 'Playlists');
}

/**
 * Fonction pour afficher les morceaux favoris de l'utilisateur
 */
function loadFavorites() {
  loadTrackPage('../php/request.php/playlist/favoris', 'Favoris');
}
