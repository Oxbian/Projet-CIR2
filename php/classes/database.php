<?php

require_once('inc/constants.php'); // Contient les constantes de connexion à la base de données
require_once('inc/data_encode.php'); // Contient les fonctions pour envoyer des données au format JSON

class Database
{
  private PDO $db;

  // Constructeur qui initialise la connexion à la base de données
  public function __construct()
  {
    try {
      $this->db = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8', DB_USER, DB_PASS);
    } catch (PDOException $e) {
      error_log('Erreur connexion: ' . $e->getMessage());
      sendError(500);
    }
  }

  // Fonction pour faire une requête à la base de données
  function request($query, $params = null)
  {
    if ($params != null) {
      $params = $this->sanitize_params($params);
    }

    try {
      $stmt = $this->db->prepare($query);
      $stmt->execute($params);
      return $stmt;
    } catch (PDOException $e) {
      error_log('Erreur requête SQL: ' . $e->getMessage());
      sendError(400);
    }
  }

  // Fonction pour faire une requête qui retourne plusieurs données d'une requête
  public function fetchAllRequest($query, $params = null)
  {
    $stmt = $this->request($query, $params);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  // Fonction pour faire une requête qui retourne une seule donnée
  public function fetchRequest($query, $params = null)
  {
    $stmt = $this->request($query, $params);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
  }

  // Fonction pour enlever les caractères spéciaux des paramètres
  function sanitize_params($params)
  {
    foreach ($params as $key => $value) {
      $params[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    }
    return $params;
  }
}
