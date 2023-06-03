<?php

require_once('database.php');

/**
 * Classe pour gérer les requêtes liées aux playlists
 */
class Playlist extends Database
{
  /**
   * Fonction pour créer une playlist  
   *
   * @param  mixed $nom Nom de la playlist
   * @param  mixed $date_creation Date de création de la playlist
   * @param  mixed $email Adresse email de l'utilisateur
   * @return void Résultat de la requête
   */
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

  /**
   * Fonction pour supprimer une playlist
   *
   * @param  mixed $id Identifiant de la playlist
   * @return void Résultat de la requête
   */
  public function dbDeletePlaylist($id)
  {
    $query = 'DELETE FROM playlist WHERE id = :id';
    $params = array(
      'id' => $id
    );
    return $this->fetchRequest($query, $params);
  }
    
  /**
   * Fonction pour mettre à jour une playlist
   *
   * @param  mixed $id Identifiant de la playlist
   * @param  mixed $nom Nom de la playlist
   * @param  mixed $email Adresse email de l'utilisateur
   * @return void Résultat de la requête
   */
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

  /**
   * Fonction pour récupérer les informations d'une playlist
   *
   * @param  mixed $id Identifiant de la playlist
   * @return Array Array contenant les informations de la playlist 
   */
  public function dbInfoPlaylist($id)
  {
    $query = 'SELECT * FROM playlist WHERE id = :id';
    $params = array(
      'id' => $id
    );
    return $this->fetchRequest($query, $params);
  }

  /**
   * Fonction pour ajouter un morceau à une playlist
   *
   * @param  mixed $id_morceau Identifiant du morceau
   * @param  mixed $id_playlist Identifiant de la playlist
   * @param  mixed $date_ajout Date d'ajout du morceau à la playlist
   * @return void Résultat de la requête
   */
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

  /**
   * Fonction pour supprimer les morceaux d'une playlist
   *
   * @param  mixed $id_morceau Identifiant du morceau
   * @param  mixed $id_playlist Identifiant de la playlist
   * @return void Résultat de la requête
   */
  public function dbDeleteTrackPlaylist($id_morceau, $id_playlist)
  {
    $query = 'DELETE FROM morceau_playlist WHERE id = :id AND id_playlist = :id_playlist';
    $params = array(
      'id' => $id_morceau,
      'id_playlist' => $id_playlist
    );
    return $this->fetchRequest($query, $params);
  }
 
  /**
   * Fonction pour récupérer les morceaux d'une playlist
   *
   * @param  mixed $id_playlist Identifiant de la playlist
   * @return Liste Liste contenant les informations des morceaux de la playlist 
   */
  public function dbGetTracksPlaylist($id_playlist)
  {
    $query = 'SELECT m.id, m.titre, m.duree, m.chemin, m.id_album FROM morceau_playlist AS mp JOIN morceau AS m ON mp.id = m.id WHERE id_playlist = :id_playlist';
    $params = array(
      'id_playlist' => $id_playlist
    );
    return $this->fetchAllRequest($query, $params);
  }
}
