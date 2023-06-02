<?php

require_once('database.php');

class Data extends Database
{
  // Fonction pour vérifier si l'utilisateur existe dans la base de données
  public function dbCheckUser($email, $password)
  {
    $query = 'SELECT * FROM utilisateur WHERE email = :email AND password = :password';
    $params = array(
      'email' => $email,
      'password' => $password
    );
    return $this->fetchAllRequest($query, $params);
  }

  // Fonction pour créer un utilisateur dans la base de données
  public function dbCreateUser($email, $prenom, $nom, $date_naissance, $password)
  {
    $query = 'INSERT INTO utilisateur (email, prenom, nom, date_naissance, password) VALUES (:email, :prenom, :nom, :date_naissance, :password)';
    $params = array(
      'email' => $email,
      'prenom' => $prenom,
      'nom' => $nom,
      'date_naissance' => $date_naissance,
      'password' => $password
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour supprimer un utilisateur de la base de données
  public function dbDeleteUser($email)
  {
    $query = 'DELETE FROM utilisateur WHERE email = :email';
    $params = array(
      'email' => $email
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour mettre à jour un utilisateur dans la base de données
  public function dbUpdateUser($email, $prenom, $nom, $date_naissance, $password)
  {
    $query = 'UPDATE utilisateur SET prenom = :prenom, nom = :nom, date_naissance = :date_naissance, password = :password WHERE email = :email';
    $params = array(
      'email' => $email,
      'prenom' => $prenom,
      'nom' => $nom,
      'date_naissance' => $date_naissance,
      'password' => $password
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour récupérer les informations d'un utilisateur dans la base de données
  public function dbInfoUser($email)
  {
    $query = 'SELECT * FROM utilisateur WHERE email = :email';
    $params = array(
      'email' => $email
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour créer une playlist
  public function dbCreatePlaylist($nom, $date_creation, $email)
  {
    $query = 'INSERT INTO playlist (nom, date_creation, email) VALUES (:nom, :date_creation, :email)';
    $params = array(
      'nom' => $nom,
      'date_creation' => $date_creation,
      'email' => $email
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour supprimer une playlist
  public function dbDeletePlaylist($id)
  {
    $query = 'DELETE FROM playlist WHERE id = :id';
    $params = array(
      'id' => $id
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour mettre à jour une playlist
  public function dbUpdatePlaylist($id, $nom, $email)
  {
    $query = 'UPDATE playlist SET nom = :nom, email = :email WHERE id = :id';
    $params = array(
      'id' => $id,
      'nom' => $nom,
      'email' => $email
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour récupérer les informations d'une playlist
  public function dbInfoPlaylist($id)
  {
    $query = 'SELECT * FROM playlist WHERE id = :id';
    $params = array(
      'id' => $id
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour ajouter une musique à la liste de lecture
  public function dbAddListenedTrack($id_morceau, $email, $date_ecoute)
  {
    $query = 'INSERT INTO morceau_utilisateur (id, email, date_ecoute) VALUES (:id, :email, :date_ecoute)';
    $params = array(
      'id' => $id_morceau,
      'email' => $email,
      'date_ecoute' => $date_ecoute
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour mettre à jour la date d'écoute d'une chanson
  public function dbUpdateListenedTrack($id_morceau, $email, $date_ecoute)
  {
    $query = 'UPDATE morceau_utilisateur SET date_ecoute = :date_ecoute WHERE id = :id AND email = :email';
    $params = array(
      'id' => $id_morceau,
      'email' => $email,
      'date_ecoute' => $date_ecoute
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour récupérer les informations d'une musique écoutée
  public function dbGetListenedTrack($id_morceau, $email)
  {
    $query = 'SELECT * FROM morceau_utilisateur WHERE id = :id AND email = :email';
    $params = array(
      'id' => $id_morceau,
      'email' => $email
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour récupérer les 10 dernières musiques écoutées
  public function dbGetListenedTracks($email)
  {
    $query = 'SELECT m.id, m.titre, m.duree, m.chemin, m.id_album FROM morceau_utilisateur AS mu JOIN morceau AS m ON mu.id = m.id WHERE mu.email = :email ORDER BY mu.date_ecoute DESC LIMIT 10';
    $params = array(
      'email' => $email
    );
    return $this->fetchAllRequest($query, $params);
  }

  // Fonction pour ajouter un morceau à une playlist
  public function dbAddTrackPlaylist($id_morceau, $id_playlist, $date_ajout)
  {
    $query = 'INSERT INTO morceau_playlist (id, id_playlist, date_ajout) VALUES (:id, :id_playlist, :date_ajout)';
    $params = array(
      'id' => $id_morceau,
      'id_playlist' => $id_playlist,
      'date_ajout' => $date_ajout
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour supprimer les morceaux d'une playlist
  public function dbDeleteTrackPlaylist($id_morceau, $id_playlist)
  {
    $query = 'DELETE FROM morceau_playlist WHERE id = :id AND id_playlist = :id_playlist';
    $params = array(
      'id' => $id_morceau,
      'id_playlist' => $id_playlist
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour récupérer les morceaux d'une playlist
  public function dbGetTracksPlaylist($id_playlist)
  {
    $query = 'SELECT m.id, m.titre, m.duree, m.chemin, m.id_album FROM morceau_playlist AS mp JOIN morceau AS m ON mp.id = m.id WHERE id_playlist = :id_playlist';
    $params = array(
      'id_playlist' => $id_playlist
    );
    return $this->fetchAllRequest($query, $params);
  }

  // Fonction pour récupérer les informations d'un morceau
  public function dbInfoTrack($id_morceau)
  {
    $query = 'SELECT * FROM morceau WHERE id = :id';
    $params = array(
      'id' => $id_morceau
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour rechercher un morceau
  public function dbSearchTrack($titre)
  {
    $query = 'SELECT * FROM morceau WHERE titre LIKE :titre';
    $params = array(
      'titre' => '%'.$titre.'%'
    );
    return $this->fetchAllRequest($query, $params);
  }

  // Fonction pour récupérer les informations d'un artiste
  public function dbInfoArtist($id_artiste)
  {
    $query = 'SELECT * FROM artiste WHERE id = :id';
    $params = array(
      'id' => $id_artiste
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour récupérer les albums d'un artiste
  public function dbAlbumsArtist($id_artiste)
  {
    $query = 'SELECT * FROM album WHERE id_artiste = :id_artiste';
    $params = array(
      'id_artiste' => $id_artiste
    );
    return $this->fetchAllRequest($query, $params);
  }

  // Fonction pour récupérer les morceaux d'un artiste
  public function dbTracksArtist($id_artiste)
  {
    $query = 'SELECT * FROM morceau JOIN album ON morceau.id_album = album.id WHERE album.id_artiste = :id_artiste';
    $params = array(
      'id_artiste' => $id_artiste
    );
    return $this->fetchAllRequest($query, $params);
  }

  // Fonction pour rechercher un artiste
  public function dbSearchArtist($nom, $prenom)
  {
    $query = 'SELECT * FROM artiste WHERE nom LIKE :nom OR prenom LIKE :prenom';
    $params = array(
      'nom' => '%'.$nom.'%',
      'prenom' => '%'.$prenom.'%'
    );
    return $this->fetchAllRequest($query, $params);
  }

  // Fonction pour récupérer les informations d'un album
  public function dbInfoAlbum($id_album)
  {
    $query = 'SELECT * FROM album WHERE id = :id';
    $params = array(
      'id' => $id_album
    );
    return $this->fetchRequest($query, $params);
  }

  // Fonction pour récupérer les morceaux d'un album
  public function dbTracksAlbum($id_album)
  {
    $query = 'SELECT * FROM morceau WHERE id_album = :id_album';
    $params = array(
      'id_album' => $id_album
    );
    return $this->fetchAllRequest($query, $params);
  }

  public function dbSearchAlbum($titre)
  {
    $query = 'SELECT * FROM album WHERE titre LIKE :titre';
    $params = array(
      'titre' => '%'.$titre.'%'
    );
    return $this->fetchAllRequest($query, $params);
  }
}
