<?php

require_once('database.php');

/**
 * Classe pour gérer les requêtes liées aux musiques écoutées
 */
class Listened extends Database
{
  /**
   * Fonction pour ajouter une musique à la liste de lecture
   *
   * @param  mixed $id_morceau Identifiant du morceau
   * @param  mixed $email Adresse email de l'utilisateur
   * @param  mixed $date_ecoute Date d'écoute du morceau
   * @return void Résultat de la requête
   */
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

  /**
   * Fonction pour mettre à jour la date d'écoute d'une chanson
   *
   * @param  mixed $id_morceau Identifiant du morceau
   * @param  mixed $email Adresse email de l'utilisateur
   * @param  mixed $date_ecoute Date d'écoute du morceau
   * @return void Résultat de la requête
   */
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

  /**
   * Fonction pour récupérer les informations d'une musique écoutée 
   *
   * @param  mixed $id_morceau Identifiant du morceau
   * @param  mixed $email Adresse email de l'utilisateur
   * @return Array Array contenant les informations de la musique écoutée
   */
  public function dbGetListenedTrack($id_morceau, $email)
  {
    $query = 'SELECT * FROM morceau_utilisateur WHERE id = :id AND email = :email';
    $params = array(
      'id' => $id_morceau,
      'email' => $email
    );
    return $this->fetchRequest($query, $params);
  }
 
  /**
   * Fonction pour récupérer les 10 dernières musiques écoutées
   *
   * @param  mixed $email Adresse email de l'utilisateur
   * @return Liste Liste contenant les informations des 10 dernières musiques écoutées
   */
  public function dbGetListenedTracks($email)
  {
    $query = 'SELECT m.id, m.titre, m.duree, m.chemin, m.id_album FROM morceau_utilisateur AS mu JOIN morceau AS m ON mu.id = m.id WHERE mu.email = :email ORDER BY mu.date_ecoute DESC';
    $params = array(
      'email' => $email
    );
    return $this->fetchAllRequest($query, $params);
  }
}
