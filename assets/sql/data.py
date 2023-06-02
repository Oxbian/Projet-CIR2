#!/usr/bin/python

import mysql.connector
import sys

"""Fonction pour executer une requete SQL"""
def executeRequest(request, value):
    try:
        if type(value) is list:
            cursor.executemany(request, value)
        else:
            cursor.execute(request, value)
    except mysql.connector.Error as e:
        print(f"Erreur: {e}")

# Connexion a la BDD
try:
  conn = mysql.connector.connect(
    user="projetweb",
    password="projetweb",
    host="localhost",
    port=3306,
    database="projet_web"
  )
except mysql.connector.Error as e:
    print(f"Erreur lors de la connexion à MariaDB: {e}")
    sys.exit(1)

# Ajout d'elements dans la BDD
cursor = conn.cursor()

# Ajout d'utilisateur
val = [("test@email.com", "test", "testo", '2000-02-29', "MONSUPERMOTDEPASSE"), ("piR@email.com", "piR", "carrey", '2000-12-31', "MOTDEPASSE")]
executeRequest("INSERT INTO utilisateur (email, prenom, nom, date_naissance, password) VALUES (?, ?, ?, ?, ?)", val)

# Ajout des types d'artistes
executeRequest("INSERT INTO type (type) VALUES (?)", [("Solo"), ("Groupe"), ("Duo")])

# Ajout d'artiste
val = [("Black", "Box", "Solo"), ("Nourished", "byMusic", "Groupe")]
executeRequest("INSERT INTO artiste (nom, prenom, type) VALUES (?, ?, ?)", val)

# Ajout d'album
val = [("Mixtep de l'ete", '2003-12-31', "monimage.jpg", 1), ("Mixtep de l'hiver", '2004-03-04', "monimage2.jpg", 2), ("Christmas", '2004-12-25', "monimage3.jpg", 2)]
executeRequest("INSERT INTO album (titre, date_parution, image, id_artiste) VALUES (?, ?, ?, ?)", val)

# Ajout de style musicaux
executeRequest("INSERT INTO style (style) VALUES (?)", [("Rock", "Pop", "Electro", "Classique")])

# Ajout de morceau
val = [("Legendary", 2.58, "legendary.mp3", 1), ("Pan Flute", 3.45, "pan-flute.mp3", 2), ("The Arkansas Traveler", 2.25, "the-arkansas-traveler.mp3", 2), ("Chinese Flute On London Bridge", 1.03, "chinese-flute-on-london-bridge.mp3", 2), ("A French christmas", 1.0, "a-french-christmas.mp3", 3), ("O Little town of Bethlehem", 0.51, "o-little-town-of-bethlehem.mp3", 3)]
executeRequest("INSERT INTO morceau (titre, duree, chemin, id_album) VALUES (?, ?, ?, ?)", val)

# Ajout de playlist
val = [("Favoris", '2020-02-29', "test@email.com"), ("Favoris", '2021-10-03', "piR@email.com")]
executeRequest("INSERT INTO playlist (nom, date_creation, email) VALUES (?, ?, ?)", val)

# Ajout d'album style
val = [("Rock", 1), ("Electro", 1), ("Classique", 2), ("Rock", 3), ("Pop", 3), ("Electro", 3), ("Classique", 3)]
executeRequest("INSERT INTO album_style (style, id) VALUES (?, ?)", val)

# Ajout de morceau_playlist
val = [(1, 1, '2023-01-01'), (2, 1, '2023-01-01'), (3, 1, '2023-01-01'), (4, 1, '2023-01-01'), (5, 2, '2023-01-01'), (6, 2, '2023-01-01')]
executeRequest("INSERT INTO morceau_playlist (id, id_playlist, date_ajout) VALUES (?, ?, ?)", val)

# Ajout de morceau_utilisateur
val = [(1, "test@email.com", '2012-06-18 10:34:09'), (4, "test@email.com", '2012-06-18 10:37:09')]
executeRequest("INSERT INTO morceau_utilisateur (id, email, date_ecoute) VALUES (?, ?, ?)", val)

conn.commit()
conn.close()
