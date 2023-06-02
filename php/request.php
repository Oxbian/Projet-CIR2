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
      if (!checkVariable($login, 401)) {
        break;
      }
      // Récupération des données de l'utilisateur
      $data = $db->dbInfoUser($login);
      checkData($data, 200, 404);
      break;

    case 'POST':
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
  switch ($requestMethod) {
    case 'GET':
      // Récupération de l'id
      $id = getId($request);
      // Récupération des infos de la musique
      if (isset($_GET['nom_morceau'])) {
        $data = $db->dbSearchTrack($_GET['nom_morceau']);
      } else if ($id != null) {
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
  switch ($requestMethod) {
    case 'GET':
      // Récupération de l'id
      $id = getId($request);
      // Vérification des infos à récupérer
      if (isset($_GET['nom_artiste']) && isset($_GET['prenom_artiste'])) {
        $data = $db->dbSearchArtist($_GET['nom_artiste'], $_GET['prenom_artiste']);
      } else if ($id == 'albums') {
        $id = array_shift($request);
        $id = getId($request);
        if (!checkVariable($id, 400)) {
          break;
        }
        $data = $db->dbAlbumsArtist($id);
      } else if ($id == 'tracks') {
        $id = array_shift($request);
        $id = getId($request);
        if (!checkVariable($id, 400)) {
          break;
        }
        $data = $db->dbTracksArtist($id);
      } else if ($id != null) {
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
  switch ($requestMethod) {
    case 'GET':
      $id = getId($request);
      // Vérification des infos à récupérer
      if (isset($_GET['nom_album'])) {
        $data = $db->dbSearchAlbum($_GET['nom_album']);
      } else if ($id == 'tracks') {
        $id = array_shift($request);
        $id = getId($request);
        if (!checkVariable($id, 400)) {
          break;
        }
        $data = $db->dbTracksAlbum($id);
      } else if ($id != null) {
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

if ($requestRessource == "playlist") { // TODO: faire les requêtes thunder client
  switch ($requestMethod) {
    case 'GET':
      // Vérification qu'on est bien connecté
      if (!checkVariable($login, 401)) {
        break;
      }
      $id = getId($request);
      // Vérification des infos à récupérer
      if ($id == 'tracks') {
        $id = array_shift($request);
        $id = getId($request);
        if (!checkVariable($id, 400)) {
          break;
        }
        $data = $db->dbGetTracksPlaylist($id);
      } else if ($id != null) {
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
        echo $db->dbGetTracksPlaylist($id);
        foreach ($tracks as $track) {
          echo $track;
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

// TODO: vérification utilisateur existe ou non

// Fonction pour vérifier si les données existent
function checkData($data, $success_code, $error_code)
{
  if ($data != false) {
    sendJsonData($data, $success_code);
  } else {
    sendError($error_code);
  }
}

// Fonction pour vérifier si une variable est null
function checkVariable($variable, $error_code)
{
  if ($variable == null) {
    sendError($error_code);
    return false;
  }
  return true;
}

// Fonction pour vérifier les inputs
function checkInput($input, $error_code)
{
  if ($input == false) {
    sendError($error_code);
    return false;
  }
  return true;
}

// Function pour récupérer l'id de la requête
function getId($request)
{
  $id = array_shift($request);
  if ($id == '') {
    $id = null;
  }
  return $id;
}
