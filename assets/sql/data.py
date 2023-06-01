#!/usr/bin/python

import mariadb
import sys

"""Fonction pour executer une requete SQL"""
def executeRequest(request, value):
    try:
        if type(value) is list:
            cursor.executemany(request, value)
        else:
            cursor.execute(request, value)
    except mariadb.Error as e:
        print(f"Erreur: {e}")

# Connexion a la BDD
try:
  conn = mariadb.connect(
    user="projetweb",
    password="projetweb",
    host="localhost",
    port=3306,
    database="projet_web"
  )
except mariadb.Error as e:
    print(f"Erreur lors de la connexion à MariaDB: {e}")
    sys.exit(1)

# Ajout d'elements dans la BDD
cursor = conn.cursor()

# Ajout d'utilisateur
val = [("test@email.com", "test", "testo", 29/02/2000, "MONSUPERMOTDEPASSE"),
       ("piR@email.com", "piR", "carrey", 31/12/2000, "MOTDEPASSE")]
executeRequest("INSERT INTO utilisateur (email, prenom, nom, date_naissance, password) VALUES (?, ?, ?, ?, ?)", val)

# Ajout des types d'artistes
executeRequest("INSERT INTO type (type) VALUES (?)", [("Solo"), ("Groupe"), ("Duo")])

# Ajout d'artiste
val = [("Black", "Box", "Solo"), ("Nourished", "byMusic", "Groupe")]
executeRequest("INSERT INTO artiste (nom, prenom, type) VALUES (?, ?, ?)", val)

# Ajout d'album
val = [("Mixtep de l'ete", 31/12/2003, "monimage.jpg", 0), ("Mixtep de l'hiver", 04/03/2004, "monimage2.jpg", 1), ("Christmas", 25/12/2004, "monimage3.jpg", 1)]
executeRequest("INSERT INTO album (titre, date_parution, image, id_artiste) VALUES (?, ?, ?, ?)", val)

# Ajout de style musicaux
executeRequest("INSERT INTO style (style) VALUES (?)", [("Rock", "Pop", "Electro", "Classique")])

# Ajout de morceau
val = [("Legendary", 2.58, "legendary.mp3", 0), ("Pan Flute", 3.45, "pan-flute.mp3", 1), ("The Arkansas Traveler", 2.25, "the-arkansas-traveler.mp3", 1),
       ("Chinese Flute On London Bridge", 1.03, "chinese-flute-on-london-bridge.mp3", 1), ("A French christmas", 1.0, "a-french-christmas.mp3", 2),
       ("O Little town of Bethlehem", 0.51, "o-little-town-of-bethlehem.mp3", 2)]
executeRequest("INSERT INTO morceau (titre, duree, chemin, id_album) VALUES (?, ?, ?, ?)", val)

# Ajout de playlist
val = [("Favoris", 29/02/2020, "test@email.com"), ("Favoris", 03/10/2021, "piR@email.com")]
executeRequest("INSERT INTO playlist (nom, date_creation, email) VALUES (?, ?, ?)", val)

# Ajout d'album style
val = [("Rock", 0), ("Electro", 0), ("Classique", 1), ("Rock", 2), ("Pop", 2), ("Electro", 2), ("Classique", 2)]
executeRequest("INSERT INTO album_style (style, id) VALUES (?, ?)", val)

# Ajout de morceau_playlist
val = [(0, 0, 01/01/2023), (1, 0, 01/01/2023), (2, 0, 01/01/2023), (3, 0, 01/01/2023), (4, 1, 01/01/2023), (5, 1, 01/01/2023)]
executeRequest("INSERT INTO morceau_playlist (id, id_playlist, date_ajout) VALUES (?, ?, ?)", val)

# Ajout de morceau_utilisateur
val = [(0, "test@email.com", '20120618 10:34:09 AM'), (1, "test@email.com", '20120618 10:37:09 AM')]
executeRequest("INSERT INTO morceau_utilisateur (id, email, date_ecoute) VALUES (?, ?, ?)", val)

conn.commit()
conn.close()
