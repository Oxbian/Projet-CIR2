<?php

require_once('classes/album.php');
require_once('classes/artist.php');
require_once('classes/listened.php');
require_once('classes/playlist.php');
require_once('classes/track.php');
require_once('classes/user.php');
require_once('inc/data_encode.php');
require_once('inc/utilities.php');
//require_once('inc/debug.php');

$requestMethod = $_SERVER['REQUEST_METHOD'];
$request = substr($_SERVER['PATH_INFO'], 1);
$request = explode('/', $request);
$requestRessource = array_shift($request);

$login = null;

// Vérification de l'utilisateur
if ($requestRessource == 'authentification') {
  $db = new User(); // Création de l'objet User qui contient les fonctions pour gérer les utilisateurs
  $email = $_SERVER['PHP_AUTH_USER'];
  $password = $_SERVER['PHP_AUTH_PW'];

  // Vérification des données envoyées
  if (!checkInput(isset($email) && isset($password), 400)) {
    return;
  }

  // Vérification que l'utilisateur existe
  if ($db->dbCheckUser($email, $password)) {
    // Création du token
    $token = base64_encode(openssl_random_pseudo_bytes(32));;
    // Enregistrement du token dans la base de données
    $db->dbAddToken($email, $token);
    // Envoi du token
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    echo ($token);
  } else {
    sendError(401);
  }
} else {
  $db = new User(); // Création de l'objet User qui contient les fonctions pour gérer les utilisateurs
  $headers = getallheaders();
  $token = $headers['Authorization'];
  if (preg_match('/Bearer (.*)/', $token, $tab)) {
    $token = $tab[1];
  }
  if ($token != null) {
    $login = $db->dbVerifyToken($token);
    // Vérification que l'utilisateur existe
    if (!$login) {
      $login = null;
    }
  }
}

// Gestion des requêtes utilisateur
if ($requestRessource == 'user') {
  $db = new User(); // Création de l'objet User qui contient les fonctions pour gérer les utilisateurs
  switch ($requestMethod) {
    case 'GET':
      // Vérification qu'on est bien connecté
      if (!checkVariable($login, 401)) {
        break;
      }
      // Récupération des données de l'utilisateur
      $data = $db->dbInfoUser($login);
      // Vérification que l'utilisateur existe
      checkData($data, 200, 404);
      break;

    case 'POST':
      // Vérification des données envoyées
      if (!checkInput(isset($_POST['email']) && isset($_POST['prenom']) && isset($_POST['nom']) && isset($_POST['date_naissance']) && isset($_POST['password']), 400)) {
        break;
      }
      // Si l'utlisateur n'existe pas déjà
      if ($db->dbInfoUser($_POST['email']) == false) {
        $data = $db->dbCreateUser($_POST['email'], $_POST['prenom'], $_POST['nom'], $_POST['date_naissance'], $_POST['password']);
        sendJsonData($data, 201);
      } else { // Sinon retourner erreur conflit
        sendError(409);
      }
      break;

    case 'PUT':
      // Vérification que l'utilisateur est bien connecté
      if (!checkVariable($login, 401)) {
        break;
      }
      // Récupération des données envoyées
      parse_str(file_get_contents('php://input'), $_PUT);
      if (!checkInput(isset($_PUT['prenom']) && isset($_PUT['nom']) && isset($_PUT['date_naissance']) && isset($_PUT['password']), 400)) {
        break;
      }
      // Modification de l'utilisateur
      $data = $db->dbUpdateUser($login, $_PUT['prenom'], $_PUT['nom'], $_PUT['date_naissance'], $_PUT['password']);
      sendJsonData($data, 200);
      break;

    case 'DELETE':
      // Vérification que l'utilisateur est bien connecté
      if (!checkVariable($login, 401)) {
        break;
      }
      // Suppression de l'utilisateur
      $data = $db->dbDeleteUser($login);
      sendJsonData($data, 200);
      break;

    default:
      // Requête non implémentée
      sendError(501);
      break;
  }
}

if ($requestRessource == "listened") {
  $db = new Listened(); // Création de l'objet Listened qui contient les fonctions pour gérer les écoutes
  switch ($requestMethod) {
    case 'GET':
      // Vérification qu'on est bien connecté
      if (!checkVariable($login, 401)) {
        break;
      }
      // Récupération des musiques écoutées par l'utilisateur
      $data = $db->dbGetListenedTracks($login);
      // Vérification que l'utilisateur a bien une liste de musiques écoutées
      checkData($data, 200, 404);
      break;

    case 'POST':
      // Vérification qu'on est bien connecté
      if (!checkVariable($login, 401) || !checkInput(isset($_POST['id_morceau']), 400)) {
        break;
      }
      // Ajout de la musique écoutée ou modification date si déjà écoutée
      if ($db->dbGetListenedTrack($_POST['id_morceau'], $login) != false) {
        $data = $db->dbUpdateListenedTrack($_POST['id_morceau'], $login, date('Y-m-d H:i:s'));
      } else {
        $data = $db->dbAddListenedTrack($_POST['id_morceau'], $login, date('Y-m-d H:i:s'));
      }
      sendJsonData($data, 201);
      break;

    default:
      // Requête non implémentée
      sendError(501);
      break;
  }
}

if ($requestRessource == "track") {
  $db = new Track(); // Création de l'objet Track qui contient les fonctions pour gérer les morceaux
  switch ($requestMethod) {
    case 'GET':
      // Récupération de l'id
      $id = getId($request);
      // Récupération des infos de la musique
      if (isset($_GET['nom_morceau'])) { // Si on veut rechercher une musique
        $data = $db->dbSearchTrack($_GET['nom_morceau']);
      } else if ($id != null) { // Si on veut récupérer une musique par ID
        $data = $db->dbInfoTrack($id);
      } else {
        sendError(400);
      }
      // Vérification que la musique existe
      checkData($data, 200, 404);
      break;

    default:
      // Requête non implémentée
      sendError(501);
      break;
  }
}

if ($requestRessource == "artist") {
  $db = new Artist(); // Création de l'objet Artist qui contient les fonctions pour gérer les artistes
  switch ($requestMethod) {
    case 'GET':
      // Récupération de l'id
      $id = getId($request);
      // Vérification des infos à récupérer
      if (isset($_GET['nom_artiste']) && isset($_GET['prenom_artiste'])) { // Si on veut rechercher un artiste
        $data = $db->dbSearchArtist($_GET['nom_artiste'], $_GET['prenom_artiste']);
      } else if ($id == 'albums') { // Si on veut récupérer les albums d'un artiste
        $id = array_shift($request);
        $id = getId($request);
        if (!checkVariable($id, 400)) {
          break;
        }
        $data = $db->dbAlbumsArtist($id);
      } else if ($id == 'tracks') { // Si on veut récupérer les musiques d'un artiste
        $id = array_shift($request);
        $id = getId($request);
        if (!checkVariable($id, 400)) {
          break;
        }
        $data = $db->dbTracksArtist($id);
      } else if ($id != null) { // Si on veut récupérer un artiste par ID
        $data = $db->dbInfoArtist($id);
      } else {
        sendError(400);
      }
      // Si les infos n'existent pas
      checkData($data, 200, 404);
      break;

    default:
      // Requête non implémentée
      sendError(501);
      break;
  }
}

if ($requestRessource == "album") {
  $db = new Album(); // Création de l'objet Album qui contient les fonctions pour gérer les albums
  switch ($requestMethod) {
    case 'GET':
      $id = getId($request);
      // Vérification des infos à récupérer
      if (isset($_GET['nom_album'])) { // Si on veut rechercher un album
        $data = $db->dbSearchAlbum($_GET['nom_album']);
      } else if ($id == 'tracks') { // Si on veut récupérer les musiques d'un album
        $id = array_shift($request);
        $id = getId($request);
        if (!checkVariable($id, 400)) {
          break;
        }
        $data = $db->dbTracksAlbum($id);
      } else if ($id != null) { // Si on veut récupérer un album par ID
        $data = $db->dbInfoAlbum($id);
      } else {
        sendError(400);
      }
      // Si les infos n'existent pas
      checkData($data, 200, 404);
      break;

    default:
      // Requête non implémentée
      sendError(501);
      break;
  }
}

if ($requestRessource == "playlist") {
  $db = new Playlist(); // Création de l'objet Playlist qui contient les fonctions pour gérer les playlists
  switch ($requestMethod) {
    case 'GET':
      // Vérification qu'on est bien connecté
      if (!checkVariable($login, 401)) {
        break;
      }
      $id = getId($request);
      // Vérification des infos à récupérer
      if ($id == 'tracks') { // Si on veut récupérer les musiques d'une playlist
        $id = array_shift($request);
        $id = getId($request);
        if (!checkVariable($id, 400)) {
          break;
        }
        $data = $db->dbGetTracksPlaylist($id);
      } else if ($id == 'user') { // Si on veut récupérer les playlists de l'utilisateur
        $data = $db->dbGetPlaylistsUser($login);
      } else if ($id != null) { // Si on veut récupérer une playlist par ID
        $data = $db->dbInfoPlaylist($id);
      } else {
        sendError(400);
      }
      // Si les infos n'existent pas
      checkData($data, 200, 404);
      break;

    case 'POST': //TODO: Gérer les conflits si déjà créer
      // Vérification qu'on est bien connecté
      if (!checkVariable($login, 401)) {
        break;
      }
      $id = getId($request);
      // Création de la playlist ou ajout de la musique
      if (isset($_POST['id_morceau']) && $_POST['id_playlist'] && $id == 'track') {
        $data = $db->dbAddTrackPlaylist($_POST['id_morceau'], $_POST['id_playlist'], date('Y-m-d'));
        sendJsonData($data, 201);
      } else if (isset($_POST['nom_playlist'])) {
        $data = $db->dbCreatePlaylist($_POST['nom_playlist'], date('Y-m-d'), $login);
        sendJsonData($data, 201);
      } else {
        sendError(400);
      }
      break;

    case 'PUT':
      // Vérification qu'on est bien connecté
      if (!checkVariable($login, 401)) {
        break;
      }
      $id = getId($request);
      // Récupération et vérification des inputs
      parse_str(file_get_contents('php://input'), $_PUT);
      if (!checkInput(isset($_PUT['nom_playlist']) && isset($_PUT['id_playlist']), 400)) {
        break;
      }
      // Modification de la playlist
      $data = $db->dbUpdatePlaylist($_PUT['id_playlist'], $_PUT['nom_playlist'], $login);
      sendJsonData($data, 200);
      break;

    case 'DELETE':
      // Vérification qu'on est bien connecté
      if (!checkVariable($login, 401)) {
        break;
      }
      $id = getId($request);
      // Récupération et vérification des delete
      parse_str(file_get_contents('php://input'), $_DELETE);
      if (isset($_DELETE['id_morceau']) && isset($_DELETE['id_playlist']) && $id == 'track') {
        $data = $db->dbDeleteTrackPlaylist($_DELETE['id_morceau'], $_DELETE['id_playlist']);
        sendJsonData($data, 200);
      } else if ($id != null) {
        foreach ($tracks as $track) {
          $db->dbDeleteTrackPlaylist($track['id_morceau'], $id);
        }
        $data = $db->dbDeletePlaylist($id);
        sendJsonData($data, 200);
      } else {
        sendError(400);
      }
      break;

    default:
      // Requête non implémentée
      sendError(501);
      break;
  }
}
