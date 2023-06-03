<?php

require_once('database.php');

/**
 * Classe pour gérer les requêtes liées aux morceaux
 */
class Track extends Database
{
  /**
   * Fonction pour récupérer les informations d'un morceau
   *
   * @param  mixed $id_morceau Identifiant du morceau
   * @return Array Array contenant les informations d'un morceau
   */
  public function dbInfoTrack($id_morceau)
  {
    $query = 'SELECT * FROM morceau WHERE id = :id';
    $params = array(
      'id' => $id_morceau
    );
    return $this->fetchRequest($query, $params);
  }

  /**
   * Fonction pour rechercher un morceau
   *
   * @param  mixed $titre Titre du morceau
   * @return Liste Liste contenant les informations des morceaux trouvés
   */
  public function dbSearchTrack($titre)
  {
    $query = 'SELECT * FROM morceau WHERE titre LIKE :titre';
    $params = array(
      'titre' => '%' . $titre . '%'
    );
    return $this->fetchAllRequest($query, $params);
  }
}
