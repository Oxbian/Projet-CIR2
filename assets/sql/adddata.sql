USE projet_web;


# ------------------------------------------------------------
#        Ajout d'utilisateur
# ------------------------------------------------------------

INSERT INTO utilisateur (email, prenom, nom, date_naissance, password) VALUES 
    ("test@email.com", "test", "testo", '2000-02-29', "89f52da4a8296d45f9cc935cdf976b709ea7f4f0023669d343a2804ae2ce4396"), 
    ("piR@email.com", "piR", "carrey", '2000-12-31', "c397fc941ee86437a1d6be69198d5b3dac38c914fd01fff555fb3373a5685a83");

# ------------------------------------------------------------
# MONSUPERMOTDEPASSE
# MOTDEPASSE
# ------------------------------------------------------------

# ------------------------------------------------------------
#        Ajout de type
# ------------------------------------------------------------

INSERT INTO type (type) VALUES 
    ("Solo"), 
    ("Groupe"), 
    ("Duo");

# ------------------------------------------------------------
#        Ajout d'artiste
# ------------------------------------------------------------

INSERT INTO artiste (nom, prenom, type) VALUES 
    ("Black", "Box", "Solo"), 
    ("Nourished", "byMusic", "Groupe");

# ------------------------------------------------------------
#        Ajout d'album
# ------------------------------------------------------------

INSERT INTO album (titre, date_parution, image, id_artiste) VALUES 
    ("Mixtep de l'ete", '2003-12-31', "monimage.jpg", 1), 
    ("Mixtep de l'hiver", '2004-03-04', "monimage2.jpg", 2), 
    ("Christmas", '2004-12-25', "monimage3.jpg", 2);

# ------------------------------------------------------------
#        Ajout de style musicaux
# ------------------------------------------------------------

INSERT INTO style (style) VALUES ("Rock"), ("Pop"), ("Electro"), ("Classique");

# ------------------------------------------------------------
#        Ajout de morceau
# ------------------------------------------------------------

INSERT INTO morceau (titre, duree, chemin, id_album) VALUES 
    ("Legendary", 2.58, "legendary.mp3", 1), 
    ("Pan Flute", 3.45, "pan-flute.mp3", 2), 
    ("The Arkansas Traveler", 2.25, "the-arkansas-traveler.mp3", 2),
    ("Chinese Flute On London Bridge", 1.03, "chinese-flute-on-london-bridge.mp3", 2),
    ("A French christmas", 1.0, "a-french-christmas.mp3", 3),
    ("O Little town of Bethlehem", 0.51, "o-little-town-of-bethlehem.mp3", 3);

# ------------------------------------------------------------
#        Ajout de playlist
# ------------------------------------------------------------

INSERT INTO playlist (nom, date_creation, email) VALUES 
    ("Favoris", '2020-02-29', "test@email.com"),
    ("Favoris", '2021-10-03', "piR@email.com");

# ------------------------------------------------------------
#        Ajout d'album style
# ------------------------------------------------------------

INSERT INTO album_style (style, id) VALUES 
    ("Rock", 1), 
    ("Electro", 1), 
    ("Classique", 2), 
    ("Rock", 3), 
    ("Pop", 3), 
    ("Electro", 3), 
    ("Classique", 3);

# ------------------------------------------------------------
#        Ajout de morceau playlist
# ------------------------------------------------------------

INSERT INTO morceau_playlist (id, id_playlist, date_ajout) VALUES 
    (1, 1, '2023-01-01'), 
    (2, 1, '2023-01-01'), 
    (3, 1, '2023-01-01'), 
    (4, 1, '2023-01-01'), 
    (5, 2, '2023-01-01'), 
    (6, 2, '2023-01-01');

# ------------------------------------------------------------
#        Ajout de morceau utilisateur
# ------------------------------------------------------------

INSERT INTO morceau_utilisateur (id, email, date_ecoute) VALUES 
    (1, "test@email.com", '2012-06-18 10:34:09'), 
    (5, "test@email.com", '2012-06-18 10:37:09')