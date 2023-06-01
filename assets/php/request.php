<?php

require_once('classes/data.php');
require_once('inc/data_encode.php');
//require_once('inc/debug.php');

$db = new Data(); // Création d'un objet Data

$requestMethod = $_SERVER['REQUEST_METHOD'];
$request = substr($_SERVER['PATH_INFO'], 1);
$request = explode('/', $request);
$requestRessource = array_shift($request);

$login = "test@email.com";

// Gestion des requêtes utilisateur
if ($requestRessource == 'user') {
  switch ($requestMethod) {
    case 'GET':
      // Vérification qu'on est bien connecté
      if ($login != null) {
        $data = $db->dbInfoUser($login);

        // Si l'utilisateur n'existe pas
        if ($data != false) {
          sendJsonData($data, 200);
        } else {
          sendError(404);
        }
      } else {
        sendError(401);
      }
      break;

    case 'POST':
      if (isset($_POST['email']) && isset($_POST['prenom']) && isset($_POST['nom']) && isset($_POST['date_naissance']) && isset($_POST['password'])) {
        // Si l'utlisateur n'existe pas déjà
        if ($db->dbInfoUser($_POST['email']) == false) {
          $data = $db->dbCreateUser($_POST['email'], $_POST['prenom'], $_POST['nom'], $_POST['date_naissance'], $_POST['password']);
          sendJsonData($data, 201);
        } else {
          sendError(409); // Demander au prof pour cette situation
        }
      } else {
        sendError(400);
      }
      break;

    case 'PUT':
      if ($login != null) {
        parse_str(file_get_contents('php://input'), $_PUT);
        if (isset($_PUT['prenom']) && isset($_PUT['nom']) && isset($_PUT['date_naissance']) && isset($_PUT['password'])) {
          $data = $db->dbUpdateUser($login, $_PUT['prenom'], $_PUT['nom'], $_PUT['date_naissance'], $_PUT['password']);
          sendJsonData($data, 200);
        } else {
          sendError(400);
        }
      } else {
        sendError(401);
      }
      break;

    case 'DELETE':
      if ($login != null) {
        $data = $db->dbDeleteUser($login);
        sendJsonData($data, 200);
      } else {
        sendError(401);
      }
      break;

    default:
      // Requête non implémentée
      sendError(501);
      break;
  }
}

if ($requestRessource == "listened") {
  switch ($requestMethod) {
    case 'GET': // TODO: retourner une liste de morceaux écoutés
      // Vérification qu'on est bien connecté
      if ($login != null) {
        $data = $db->dbGetListenedTracks($login);
        // Si l'utilisateur n'a pas de musiques écoutées
        if ($data != false) {
          sendJsonData($data, 200);
        } else {
          sendError(404);
        }
      } else {
        sendError(401);
      }
      break;

    case 'POST': // TODO: demander si les morceaux doivent être différents ou uniques
      if ($login != null) {
        if (isset($_POST['id_morceau'])) {
          $data = $db->dbAddListenedTrack($_POST['id_morceau'], $login, date('Y-m-d H:i:s'));
          sendJsonData($data, 201);
        } else {
          sendError(400);
        }
      } else {
        sendError(401);
      }
      break;

    default:
      // Requête non implémentée
      sendError(501);
      break;
  }
}

if ($requestRessource == "track") {
  switch ($requestMethod) {
    case 'GET':
      $id = array_shift($request);
      if ($id == '') {
        $id = null;
      }
      if ($id != null) {
        $data = $db->dbInfoTrack($id);
        // Si la musique n'existe pas
        if ($data != false) {
          sendJsonData($data, 200);
        } else {
          sendError(404);
        }
      } else {
        sendError(400);
      }
      break;

    case 'POST': // TODO: demander quelle type utiliser pour les recherches
      if (isset($_POST['nom_morceau'])) {
        $data = $db->dbSearchTrack($_POST['nom_morceau']);
        if ($data != false) {
          sendJsonData($data, 200);
        } else {
          sendError(404);
        }
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

if ($requestRessource == "artist") {
  switch ($requestMethod) {
    case 'GET':
      $id = array_shift($request);
      if ($id == '') {
        $id = null;
      }
      // Vérification des infos à récupérer
      if ($id == 'albums') {
        $id = array_shift($request);
        $data = $db->dbAlbumsArtist($id);
      } else if ($id == 'tracks') { // TODO: Modifier pour récupérer seulement infos du morceau
        $id = array_shift($request);
        $data = $db->dbTracksArtist($id);
      } else if ($id != null) {
        $data = $db->dbInfoArtist($id);
      } else {
        sendError(400);
      }

      // Si les infos n'existent pas
      if ($data != false) {
        sendJsonData($data, 200);
      } else {
        sendError(404);
      }
      break;

    case 'POST': // TODO: demander quelle type utiliser pour les recherches
      if (isset($_POST['nom_artiste']) && isset($_POST['prenom_artiste'])) {
        $data = $db->dbSearchArtist($_POST['nom_artiste'], $_POST['prenom_artiste']);
        if ($data != false) {
          sendJsonData($data, 200);
        } else {
          sendError(404);
        }
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

if ($requestRessource == "album") {
  switch ($requestMethod) {
    case 'GET':
      $id = array_shift($request);
      if ($id == '') {
        $id = null;
      }

      // Vérification des infos à récupérer
      if ($id == 'tracks') {
        $id = array_shift($request);
        $data = $db->dbTracksAlbum($id);
      } else if ($id != null) {
        $data = $db->dbInfoAlbum($id);
      } else {
        sendError(400);
      }
      // Si les infos n'existent pas
      if ($data != false) {
        sendJsonData($data, 200);
      } else {
        sendError(404);
      }
      break;

    case 'POST': // TODO: demander quelle type utiliser pour les recherches
      if (isset($_POST['nom_album'])) {
        $data = $db->dbSearchAlbum($_POST['nom_album']);
        if ($data != false) {
          sendJsonData($data, 200);
        } else {
          sendError(404);
        }
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

if ($requestRessource == "playlist") { // TODO: faire les requêtes thunder client
  switch ($requestMethod) {
    case 'GET':
      if ($login != null) {
        $id = array_shift($request);
        if ($id == '') {
          $id = null;
        }

        // Vérification des infos à récupérer
        if ($id == 'tracks') {
          $id = array_shift($request);
          $data = $db->dbGetTracksPlaylist($id);
        } else if ($id != null) {
          $data = $db->dbInfoPlaylist($id);
        } else {
          sendError(400);
        }
        // Si les infos n'existent pas
        if ($data != false) {
          sendJsonData($data, 200);
        } else {
          sendError(404);
        }
      } else {
        sendError(401);
      }
      break;

    case 'POST': //TODO: Gérer les conflits si déjà créer
      if ($login != null) {
        $id = array_shift($request);
        if ($id == '') {
          $id = null;
        }
        if (isset($_POST['id_morceau']) && $_POST['id_playlist'] && $id == 'track') {
          $data = $db->dbAddTrackPlaylist($_POST['id_morceau'], $_POST['id_playlist'], date('Y-m-d'));
          sendJsonData($data, 201);
        } else if (isset($_POST['nom_playlist'])) {
          $data = $db->dbCreatePlaylist($_POST['nom_playlist'], $login, date('Y-m-d'));
        } else {
          sendError(400);
        }
      } else {
        sendError(401);
      }
      break;

    case 'PUT':
      if ($login != null) {
        $id = array_shift($request);
        if ($id == '') {
          $id = null;
        }
        if (isset($_POST['nom_playlist']) && isset($_POST['id_playlist'])) {
          $data = $db->dbUpdatePlaylist($_POST['id_playlist'], $_POST['nom_playlist'], $login);
          sendJsonData($data, 200);
        } else {
          sendError(400);
        }
      } else {
        sendError(401);
      }
      break;

    case 'DELETE':
      if ($login != null) {
        $id = array_shift($request);
        if ($id == '') {
          $id = null;
        }
        if (isset($_POST['id_morceau']) && isset($_POST['id_playlist']) && $id == 'track') {
          $data = $db->dbDeleteTrackPlaylist($_POST['id_morceau'], $_POST['id_playlist'], $login);
          sendJsonData($data, 200);
        } else if (isset($_POST['id_playlist'])) {
          $data = $db->dbDeletePlaylist($_POST['id_playlist'], $login);
          sendJsonData($data, 200);
        } else {
          sendError(400);
        }
      } else {
        sendError(401);
      }
      break;

    default:
      // Requête non implémentée
      sendError(501);
      break;
  }
}

// TODO: faire fonction pour clean ce code
// TODO: faire test
// TODO: faire test thunder client