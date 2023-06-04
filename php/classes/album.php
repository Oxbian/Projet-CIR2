<?php

require_once('database.php');

/**
 * Classe pour gérer les requêtes liées aux albums
 */
class Album extends Database
{
  /**
   * Fonction pour récupérer les informations d'un album  
   *
   * @param  mixed $id_album Identifiant de l'album
   * @return Array Array contentant les informations de l'album
   */
  public function dbInfoAlbum($id_album)
  {
    $query = 'SELECT * FROM album WHERE id = :id';
    $params = array(
      'id' => $id_album
    );
    return $this->fetchRequest($query, $params);
  }
 
  /**
   * Fonction pour récupérer les morceaux d'un album 
   *
   * @param  mixed $id_album Identifiant de l'album
   * @return Liste Liste contentant les informations morceaux de l'album
   */
  public function dbTracksAlbum($id_album)
  {
    $query = 'SELECT * FROM morceau WHERE id_album = :id_album';
    $params = array(
      'id_album' => $id_album
    );
    return $this->fetchAllRequest($query, $params);
  }
  
  /**
   * Fonction pour rechercher un album à partir de son titre
   *
   * @param  mixed $titre Titre de l'album
   * @return Liste Liste contenant les informations des albums trouvés
   */
  public function dbSearchAlbum($titre)
  {
    $query = 'SELECT * FROM album WHERE titre LIKE :titre';
    $params = array(
      'titre' => '%' . $titre . '%'
    );
    return $this->fetchAllRequest($query, $params);
  }
}
