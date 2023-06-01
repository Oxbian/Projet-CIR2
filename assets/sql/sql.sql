#------------------------------------------------------------
#        Change database
#------------------------------------------------------------
USE projet_web;

#------------------------------------------------------------
#        Database cleanup
#------------------------------------------------------------

DROP TABLE IF EXISTS morceau_utilisateur;
DROP TABLE IF EXISTS morceau_playlist;
DROP TABLE IF EXISTS album_style;
DROP TABLE IF EXISTS playlist;
DROP TABLE IF EXISTS morceau;
DROP TABLE IF EXISTS style;
DROP TABLE IF EXISTS album;
DROP TABLE IF EXISTS artiste;
DROP TABLE IF EXISTS type;
DROP TABLE IF EXISTS utilisateur;

#------------------------------------------------------------
#        Database creation
#------------------------------------------------------------
CREATE TABLE utilisateur(
        email          Varchar (320) NOT NULL COMMENT "Taille maximale 320 caractères comme définit par la RFC 3696"  ,
        prenom         Varchar (255) NOT NULL ,
        nom            Varchar (255) NOT NULL ,
        date_naissance Date NOT NULL ,
        password       Varchar (255) NOT NULL
	,CONSTRAINT utilisateur_PK PRIMARY KEY (email)
)ENGINE=InnoDB;

CREATE TABLE type(
        type Varchar (255) NOT NULL
	,CONSTRAINT type_PK PRIMARY KEY (type)
)ENGINE=InnoDB;

CREATE TABLE artiste(
        id     Int  Auto_increment  NOT NULL ,
        nom    Varchar (255) NOT NULL ,
        prenom Varchar (50) NOT NULL ,
        type   Varchar (255) NOT NULL
	,CONSTRAINT artiste_PK PRIMARY KEY (id)

	,CONSTRAINT artiste_type_FK FOREIGN KEY (type) REFERENCES type(type)
)ENGINE=InnoDB;

CREATE TABLE album(
        id            Int  Auto_increment  NOT NULL ,
        titre         Varchar (255) NOT NULL ,
        date_parution Date NOT NULL ,
        image         Varchar (255) COMMENT "Lien image"  ,
        id_artiste    Int NOT NULL
	,CONSTRAINT album_PK PRIMARY KEY (id)

	,CONSTRAINT album_artiste_FK FOREIGN KEY (id_artiste) REFERENCES artiste(id)
)ENGINE=InnoDB;

CREATE TABLE style(
        style Varchar (255) NOT NULL
	,CONSTRAINT style_PK PRIMARY KEY (style)
)ENGINE=InnoDB;

CREATE TABLE morceau(
        id       Int  Auto_increment  NOT NULL ,
        titre    Varchar (255) NOT NULL ,
        duree    Decimal (5,3) NOT NULL ,
        chemin   Varchar (1024) NOT NULL ,
        id_album Int NOT NULL
	,CONSTRAINT morceau_PK PRIMARY KEY (id)

	,CONSTRAINT morceau_album_FK FOREIGN KEY (id_album) REFERENCES album(id)
)ENGINE=InnoDB;

CREATE TABLE playlist(
        id            Int  Auto_increment  NOT NULL ,
        nom           Varchar (255) NOT NULL ,
        date_creation Date NOT NULL ,
        email         Varchar (320) NOT NULL COMMENT "Taille maximale 320 caractères comme définit par la RFC 3696" 
	,CONSTRAINT playlist_PK PRIMARY KEY (id)

	,CONSTRAINT playlist_utilisateur_FK FOREIGN KEY (email) REFERENCES utilisateur(email)
)ENGINE=InnoDB;

CREATE TABLE album_style(
        style Varchar (255) NOT NULL ,
        id    Int NOT NULL
	,CONSTRAINT album_style_PK PRIMARY KEY (style,id)

	,CONSTRAINT album_style_style_FK FOREIGN KEY (style) REFERENCES style(style)
	,CONSTRAINT album_style_album0_FK FOREIGN KEY (id) REFERENCES album(id)
)ENGINE=InnoDB;

CREATE TABLE morceau_playlist(
        id          Int NOT NULL ,
        id_playlist Int NOT NULL ,
        date_ajout  Date NOT NULL
	,CONSTRAINT morceau_playlist_PK PRIMARY KEY (id,id_playlist)

	,CONSTRAINT morceau_playlist_morceau_FK FOREIGN KEY (id) REFERENCES morceau(id)
	,CONSTRAINT morceau_playlist_playlist0_FK FOREIGN KEY (id_playlist) REFERENCES playlist(id)
)ENGINE=InnoDB;

CREATE TABLE morceau_utilisateur(
        id          Int NOT NULL ,
        email       Varchar (320) NOT NULL COMMENT "Taille maximale 320 caractères comme définit par la RFC 3696"  ,
        date_ecoute Datetime NOT NULL
	,CONSTRAINT morceau_utilisateur_PK PRIMARY KEY (id,email)

	,CONSTRAINT morceau_utilisateur_morceau_FK FOREIGN KEY (id) REFERENCES morceau(id)
	,CONSTRAINT morceau_utilisateur_utilisateur0_FK FOREIGN KEY (email) REFERENCES utilisateur(email)
)ENGINE=InnoDB;

set names utf8;
