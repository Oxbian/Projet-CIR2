<?php

require_once('database.php');

/**
 * Classe pour gérer les requêtes liées aux utilisateurs
 */
class User extends Database
{
  /**
   * Fonction pour vérifier si l'utilisateur existe dans la base de données
   *
   * @param  mixed $email Adresse email de l'utilisateur
   * @param  mixed $password Mot de passe de l'utilisateur
   * @return void Résultat de la requête
   */
  public function dbCheckUser($email, $_password)
  {
    $password = hash('sha256', $_password);
    $query = 'SELECT * FROM utilisateur WHERE email = :email AND password = :password';
    $params = array(
      'email' => $email,
      'password' => $password
    );
    return $this->fetchRequest($query, $params);
  }

  /**
   * Fonction pour créer un utilisateur dans la base de données
   *
   * @param  mixed $email Adresse email de l'utilisateur
   * @param  mixed $prenom Prénom de l'utilisateur
   * @param  mixed $nom Nom de l'utilisateur
   * @param  mixed $date_naissance Date de naissance de l'utilisateur
   * @param  mixed $password Mot de passe de l'utilisateur
   * @return void Résultat de la requête
   */
  public function dbCreateUser($email, $prenom, $nom, $date_naissance, $_password)
  {
    $password = hash('sha256', $_password);
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

  /**
   * Fonction pour supprimer un utilisateur de la base de données
   *
   * @param  mixed $email Adresse email de l'utilisateur
   * @return void Résultat de la requête
   */
  public function dbDeleteUser($email)
  {
    $query = 'DELETE FROM utilisateur WHERE email = :email';
    $params = array(
      'email' => $email
    );
    return $this->fetchRequest($query, $params);
  }

  /**
   * Fonction pour mettre à jour un utilisateur dans la base de données
   *
   * @param  mixed $email Adresse email de l'utilisateur
   * @param  mixed $prenom Prénom de l'utilisateur
   * @param  mixed $nom Nom de l'utilisateur
   * @param  mixed $date_naissance Date de naissance de l'utilisateur
   * @param  mixed $password Mot de passe de l'utilisateur
   * @return void Résultat de la requête
   */
  public function dbUpdateUser($email, $prenom, $nom, $date_naissance, $_password)
  {
    $password = hash('sha256', $_password);
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

  /**
   * Fonction pour récupérer les informations d'un utilisateur dans la base de données
   *
   * @param  mixed $email Adresse email de l'utilisateur
   * @return Array Array contenant les informations d'un utilisateur 
   */
  public function dbInfoUser($email)
  {
    $query = 'SELECT * FROM utilisateur WHERE email = :email';
    $params = array(
      'email' => $email
    );
    return $this->fetchRequest($query, $params);
  }

  /**
   * Fonction pour modifier le token d'un utilisateur dans la base de données
   *
   * @param  mixed $email Adresse email de l'utilisateur
   * @param  mixed $token Token de l'utilisateur
   * @return void Résultat de la requête
   */
  public function dbAddToken($email, $token)
  {
    $query = 'UPDATE utilisateur SET token = :token WHERE email = :email';
    $params = array(
      'email' => $email,
      'token' => $token
    );
    return $this->fetchRequest($query, $params);
  }

  /**
   * Fonction pour récupérer l'utilisateur à qui appartient le token
   * 
   * @param  mixed $token Token de l'utilisateur
   * @return String Adresse email de l'utilisateur
   */
  public function dbVerifyToken($token)
  {
    $query = 'SELECT * FROM utilisateur WHERE token = :token';
    $params = array(
      'token' => $token
    );
    $result = $this->fetchRequest($query, $params);
    if (!$result) {
      return false;
    }
    return $result['email'];
  }
}
