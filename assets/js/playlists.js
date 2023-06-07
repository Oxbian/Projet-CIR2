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
 * @param {*} id L'id de la playlist à supprimer
 */
function deletePlaylist(id) {
  ajaxRequest('DELETE', `../php/request.php/playlist/${id}`, loadPlaylists);
}

/**
 * Fonction pour modifier une playlist
 * @param {*} id L'id de la playlist à modifier
 */
function updatePlaylist(id) {
  // Récupération des données
  const nom = window.prompt('Nom de la playlist :');
  if (nom != null && nom !== '') {
    ajaxRequest('PUT', '../php/request.php/playlist', () => {
      loadTrackPage(`../php/request.php/playlist/tracks/${id}`, `${nom}`);
    }, `nom_playlist=${nom}&id_playlist=${id}`);
  }
}

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
 * Fonction pour mettre à jour le bouton like
 * @param {*} id L'id du morceau à liker
 * @param {*} data Les données de la requête
 */
function setFav(id, data) {
  const like = document.getElementById('like');
  if (like) {
    like.onclick = null;
    if (data !== 404 && data !== 400) {
      like.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='none'%3E%3Cpath fill='%23FF4644' fill-rule='evenodd' d='M12.5 2.19c6.935-7.603 24.272 5.703 0 22.81-24.272-17.107-6.935-30.413 0-22.81Z' clip-rule='evenodd'/%3E%3C/svg%3E")`;
      like.onclick = () => { unlikeTrack(id); };
    } else {
      like.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='none'%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M12.5 2.19c6.935-7.603 24.272 5.703 0 22.81-24.272-17.107-6.935-30.413 0-22.81Z' clip-rule='evenodd'/%3E%3C/svg%3E")`;
      like.onclick = () => { likeTrack(id); };
    }
  }
}

/**
 * Fonction pour ajouter une musique à une playlist
 * @param {*} id_morceau L'id du morceau à ajouter
 */
function addTrack(id_morceau) {
  // Récupération de l'id de la playlist
  const nom_playlist = window.prompt('Nom de la playlist où ajouter le morceau: ');
  ajaxRequest('GET', '../php/request.php/playlist/search', (data) => {
    ajaxRequest('POST', '../php/request.php/playlist/track', null, `id_morceau=${id_morceau}&id_playlist=${data.id}`);
  }, `nom_playlist=${nom_playlist}`);
}

/**
 * Fonction pour liker une musique
 * @param {*} id_morceau L'id du morceau à liker
 */
function likeTrack(id_morceau) {
  ajaxRequest('GET', '../php/request.php/playlist/search', (data) => {
    // Ajout du like
    ajaxRequest('POST', '../php/request.php/playlist/track', () => {
      // Vérification du like
      ajaxRequest('GET', '../php/request.php/playlist/checkfav', (data) => { setFav(id_morceau, data); }, `id_morceau=${id_morceau}`);
    }, `id_morceau=${id_morceau}&id_playlist=${data.id}`);
  }, 'nom_playlist=Favoris');
}

/**
 * Fonction pour disliker un morceau
 * @param {*} id_morceau L'id du morceau à unliker
 */
function unlikeTrack(id_morceau) {
  ajaxRequest('GET', '../php/request.php/playlist/search', (data) => {
    // Suppression du like
    ajaxRequest('DELETE', '../php/request.php/playlist/track', () => {
      // Vérification du like
      ajaxRequest('GET', '../php/request.php/playlist/checkfav', (data) => { setFav(id_morceau, data); }, `id_morceau=${id_morceau}`);
    }, `id_morceau=${id_morceau}&id_playlist=${data.id}`);
  }, 'nom_playlist=Favoris');
}

/**
 * Fonction pour supprimer un morceau d'une playlist
 * @param {*} id_morceau L'id du morceau à supprimer
 * @param {*} id_playlist L'id de la playlist où supprimer le morceau
 * @param {*} nom_playlist Le nom de la playlist où supprimer le morceau
 */
function deleteTrack(id_morceau, id_playlist, nom_playlist) {
    // Suppression du morceau dans la playlist
    ajaxRequest('DELETE', '../php/request.php/playlist/track', () => {
      loadTrackPage(`../php/request.php/playlist/tracks/${id_playlist}`, `${nom_playlist}`);
    }, `id_morceau=${id_morceau}&id_playlist=${id_playlist}`);
}
