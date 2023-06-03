# API REST

Ce fichier contient la documentation de l'API REST du projet.

# Utilisation

Pour utiliser l'API, il faut envoyer des requêtes HTTP à l'adresse du serveur, par exemple `http://prj-cir-web-grp-56/`.

# Requêtes & réponses

## Utilisateur

**Code d'erreurs 501:** Requête non implémentée

### Récupérer les informations

- **GET** http://prj-cir-web-grp-56/php/request.php/user  

- **Retourne:** un dictionnaire avec l'email, le prénom, nom, date de naissance et le mot de passe de l'utilisateur.  

- **Code d'erreurs:**
    - 401: Utilisateur non connecté
    - 404: Utilisateur non trouvé
    - 200: Ok

### Créer un utilisateur

- **POST** http://prj-cir-web-grp-56/php/request.php/user + form-encode avec les champs suivants:  
    - email
    - prenom
    - nom
    - date_naissance
    - password

- **Retourne:** rien

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 409: Utilisateur déjà existant
    - 201: Utilisateur créer

### Modifier les infos d'un utilisateur

- **PUT** http://prj-cir-web-grp-56/php/request.php/user + form-encode avec les champs suivants:  
    - prenom
    - nom
    - date_naissance
    - password

- **Retourne:** false

- **Code d'erreurs:** 
    - 400: Paramètres manquants ou incorrects
    - 401: Utilisatuer non connecté
    - 200: Utilisateur modifié

### Supprimer un utilisateur

- **DELETE** http://prj-cir-web-grp-56/php/request.php/user

- **Retourne:** false

- **Code d'erreurs:**
    - 401: Utilisateur non connecté
    - 200: Utilisateur supprimé

## Musiques écoutées

**Code d'erreurs 501:** Requête non implémentée

### Récupérer les musiques écoutées

- **GET** http://prj-cir-web-grp-56/php/request.php/listened

- **Retourne:** un dictionnaire avec les musiques écoutées par l'utilisateur.

- **Code d'erreurs:**
    - 401: Utilisateur non connecté
    - 404: Musiques non trouvées
    - 200: Ok

### Ajouter une musique écoutée

- **POST** http://prj-cir-web-grp-56/php/request.php/listened + form-encode avec les champs suivants:  
    - id_morceau

- **Retourne:** rien

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 401: Utilisateur non connecté
    - 201: Musique ajoutée

## Morceaux

**Code d'erreurs 501:** Requête non implémentée

### Récupérer les infos d'morceau

- **GET** http://prj-cir-web-grp-56/php/request.php/track/id (id = id du morceau)

- **Retourne:** un dictionnaire avec les infos du morceau.

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 404: Morceau non trouvé
    - 200: Ok

### Rechercher un morceau

- **GET** http://prj-cir-web-grp-56/php/request.php/track?nom_morceau=nom (nom = nom du morceau recherché)

- **Retourne:** une liste des morceaux correspondant avec leurs infos.

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 404: Morceau non trouvé
    - 200: Ok

## Artistes

**Code d'erreurs 501:** Requête non implémentée

### Récupérer les infos d'un artiste

- **GET** http://prj-cir-web-grp-56/php/request.php/artist/id (id = id de l'artiste)

- **Retourne:** un dictionnaire avec les infos de l'artiste.

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 404: Artiste non trouvé
    - 200: Ok

### Récupérer les albums d'un artiste

- **GET** http://prj-cir-web-grp-56/php/request.php/artist/albums/id (id = id de l'artiste)

- **Retourne:** une liste des albums de l'artiste avec leurs infos.

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 404: Artiste ou albums non trouvées
    - 200: Ok

### Récupérer les morceaux d'un artiste

- **GET** http://prj-cir-web-grp-56/php/request.php/artist/tracks/id (id = id de l'artiste)

- **Retourne:** une liste des morceaux de l'artiste avec leurs infos.

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 404: Artiste ou morceaux non trouvées
    - 200: Ok

### Rechercher un artiste

- **GET** http://prj-cir-web-grp-56/php/request.php/artist?nom_artiste=nom&prenom_artiste=prenom (nom = nom de l'artiste recherché, prenom = prenom de l'artiste recherché)

- **Retourne:** une liste des artistes correspondant avec leurs infos.

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 404: Artiste non trouvé
    - 200: Ok

## Albums

**Code d'erreurs 501:** Requête non implémentée

### Récupérer les infos d'un album

- **GET** http://prj-cir-web-grp-56/php/request.php/album/id (id = id de l'album)

- **Retourne:** un dictionnaire avec les infos de l'album.

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 404: Album non trouvé
    - 200: Ok

### Récupérer les morceaux d'un album

- **GET** http://prj-cir-web-grp-56/php/request.php/album/tracks/id (id = id de l'album)

- **Retourne:** une liste des morceaux de l'album avec leurs infos.

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 404: Album ou morceaux non trouvées
    - 200: Ok


### Rechercher un album

- **GET** http://prj-cir-web-grp-56/php/request.php/album?nom_album=nom (nom = nom de l'album recherché)

- **Retourne:** une liste des albums correspondant avec leurs infos.

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 404: Album non trouvé
    - 200: Ok

## Playlists

**Code d'erreurs 501:** Requête non implémentée

### Récupérer les infos d'une playlist

- **GET** http://prj-cir-web-grp-56/php/request.php/playlist/id (id = id de la playlist)

- **Retourne:** un dictionnaire avec les infos de la playlist.

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 401: Utilisateur non connecté
    - 404: Playlist non trouvée
    - 200: Ok

### Récupérer les morceaux d'une playlist

- **GET** http://prj-cir-web-grp-56/php/request.php/playlist/tracks/id (id = id de la playlist)

- **Retourne:** une liste des morceaux de la playlist avec leurs infos.

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 401: Utilisateur non connecté
    - 404: Playlist ou morceaux non trouvées
    - 200: Ok

### Créer une playlist

- **POST** http://prj-cir-web-grp-56/php/request.php/playlist + form-encode avec les champs suivants:  
    - nom_playlist

- **Retourne:** rien

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 401: Utilisateur non connecté
    - 201: Playlist créée

### Ajouter un morceau à une playlist

- **POST** http://prj-cir-web-grp-56/php/request.php/playlist/id (id = id de la playlist) + form-encode avec les champs suivants:  
    - id_morceau
    - id_playlist

- **Retourne:** rien

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 401: Utilisateur non connecté
    - 404: Playlist ou morceau non trouvés
    - 201: Morceau ajouté à la playlist

### Mettre à jour les infos d'une playlist

- **PUT** http://prj-cir-web-grp-56/php/request.php/playlist/id (id = id de la playlist) + form-encode avec les champs suivants:  
    - nom_playlist
    - id_playlist

- **Retourne:** rien

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 401: Utilisateur non connecté
    - 200: Playlist mise à jour

### Supprimer une playlist

- **DELETE** http://prj-cir-web-grp-56/php/request.php/playlist/id (id = id de la playlist)

- **Retourne:** rien

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 401: Utilisateur non connecté
    - 200: Playlist supprimée

### Supprimer un morceau d'une playlist

- **DELETE** http://prj-cir-web-grp-56/php/request.php/playlist/id (id = id de la playlist) + form-encode avec les champs suivants:  
    - id_morceau
    - id_playlist

- **Retourne:** rien

- **Code d'erreurs:**
    - 400: Paramètres manquants ou incorrects
    - 401: Utilisateur non connecté
    - 200: Morceau supprimé de la playlist