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

/**
 * Fonction pour supprimer une playlist
 */
function deletePlaylist() {
  const id = document.getElementById('title').dataset.playlistid;
  console.log(id);
  ajaxRequest('DELETE', `../php/request.php/playlist/${id}`, loadPlaylists);
}

/**
 * Fonction pour modifier une playlist
 */
function updatePlaylist() {
  // Récupération des données
  const id = document.getElementById('title').dataset.playlistid;
  const nom = window.prompt('Nom de la playlist :');
  if (nom != null && nom !== '') {
    ajaxRequest('PUT', '../php/request.php/playlist', () => {
      loadTrackPage(`../php/request.php/playlist/tracks/${id}`, `${nom}`);
    }, `nom_playlist=${nom}&id_playlist=${id}`);
  }
}