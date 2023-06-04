<?php

require_once('database.php');

/**
 * Classe pour gérer les requêtes liées aux artistes
 */
class Artist extends Database
{ 
  /**
   * Fonction pour récupérer les informations d'un artiste
   *
   * @param  mixed $id_artiste Identifiant de l'artiste
   * @return Array Array contentant les informations de l'artiste
   */
  public function dbInfoArtist($id_artiste)
  {
    $query = 'SELECT * FROM artiste WHERE id = :id';
    $params = array(
      'id' => $id_artiste
    );
    return $this->fetchRequest($query, $params);
  }

  /**
   * Fonction pour récupérer les albums d'un artiste
   *
   * @param  mixed $id_artiste Identifiant de l'artiste
   * @return Liste Liste contentant les informations des albums de l'artiste
   */
  public function dbAlbumsArtist($id_artiste)
  {
    $query = 'SELECT * FROM album WHERE id_artiste = :id_artiste';
    $params = array(
      'id_artiste' => $id_artiste
    );
    return $this->fetchAllRequest($query, $params);
  }

  /**
   * Fonction pour récupérer les morceaux d'un artiste
   *
   * @param  mixed $id_artiste Identifiant de l'artiste
   * @return Liste Liste contenant les informations des morceaux de l'artiste
   */
  public function dbTracksArtist($id_artiste)
  {
    $query = 'SELECT * FROM morceau JOIN album ON morceau.id_album = album.id WHERE album.id_artiste = :id_artiste';
    $params = array(
      'id_artiste' => $id_artiste
    );
    return $this->fetchAllRequest($query, $params);
  }
  
  /**
   * Fonction pour rechercher un artiste
   *
   * @param  mixed $nom Nom de l'artiste
   * @param  mixed $prenom Prénom de l'artiste
   * @return Liste Liste contenant les informations des artistes trouvés
   */
  public function dbSearchArtist($nom, $prenom)
  {
    $query = 'SELECT * FROM artiste WHERE nom LIKE :nom OR prenom LIKE :prenom';
    $params = array(
      'nom' => '%' . $nom . '%',
      'prenom' => '%' . $prenom . '%'
    );
    return $this->fetchAllRequest($query, $params);
  }
}
