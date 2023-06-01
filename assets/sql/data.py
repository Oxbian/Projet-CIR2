#!/usr/bin/python

import mariadb
import sys

"""Fonction pour executer une requête SQL"""
def executeRequest(request, value):
    try:
        if type(value) is list:
            cursor.executemany(request, value)
        else:
            cursor.execute(request, value)
    except mariadb.Error as e:
        print(f"Erreur: {e}")

# Connexion à la BDD
try:
  conn = mariadb.connect(
    user="projetcir2",
    password="projetcir2",
    host="localhost",
    port=3306,
    database="projet-cir2"
  )
except mariadb.Error as e:
    print(f"Erreur lors de la connexion à MariaDB: {e}")
    sys.exit(1)

# Ajout d'éléments dans la BDD
cursor = conn.cursor()

# Ajout d'utilisateur
val = [("test@email.com", "test", "testo", 29/02/2000, "MONSUPERMOTDEPASSE"),
       ("piR@email.com", "piR", "carrey", 31/12/2000, "MOTDEPASSE")]
executeRequest("INSERT INTO utilisateur (email, prenom, nom, date_naissance, password) VALUES (?, ?, ?, ?, ?)", val)

# Ajout des types d'artistes
executeRequest("INSERT INTO type (type) VALUES (?)", [("Solo"), ("Groupe"), ("Duo")])

# Ajout d'artiste
val = [("dupont", "jean", "Solo"), ("Dupond", "Jean", "Solo")]
executeRequest("INSERT INTO artiste (nom, prenom, type) VALUES (?, ?, ?)", val)

# Ajout d'album
val = [("Mixtep de l'été", 31/12/2003, "monimage.jpg", 0), ("Mixtep de l'hiver", 04/03/2004, "monimage2.jpg", 1)]
executeRequest("INSERT INTO album (titre, date_parution, image, id_artiste) VALUES (?, ?, ?, ?)", val)

# Ajout de style musicaux
executeRequest("INSERT INTO style (style) VALUES (?)", [("Rock", "Pop", "Electro")])

# Ajout de morceau
val = [""]
executeRequest("INSERT INTO morceau (titre, duree, id_album) VALUES (?, ?, ?)", val)

# Ajout de playlist
val = [""]
executeRequest("INSERT INTO playlist (nom, date_creation, email) VALUES (?, ?, ?)", val)

# Ajout d'album style
val = [""]
executeRequest("INSERT INTO album_style (style, id) VALUES (?, ?)", val)

# Ajout de morceau_playlist
val = [""]
executeRequest("INSERT INTO morceau_playlist (id, id_playlist, date_ajout) VALUES (?, ?, ?)", val)

# Ajout de morceau_utilisateur
val = [""]
executeRequest("INSERT INTO morceau_utilisateur (id, email, date_ecoute) VALUES (?, ?, ?)", val)

conn.commit()
conn.close()
