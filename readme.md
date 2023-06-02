# Projet CIR2
------

Ce projet à pour but de réaliser une application de lecture de musique permettant de rechercher des artistes, albums et morceaux pour les lire.  
Elle devra aussi permettre de gérer les profils utilisateurs avec leurs listes de lecture et indiquer les derniers morceaux joués.  

## Installation

Dans un premier temps il est essentiel de configurer le serveur, pour cela un script est à votre disposition `config-server.sh`  
Pour l'ajouter à votre serveur, vous pouvez utilisez la commande suivante:  
```bash
scp config-server.sh username@ip_address:/home/username/ 
```

Puis dans mysql:
```mysql
source assets/sql/adduser.sql
source assets/sql/sql.sql
```

## Maquette & MCD

Le MCD est disponible sous le fichier `bdd.mcd`, et la maquette est disponbile sur [figma](https://www.figma.com/file/iWuCapQ3FRZmkkparAza9k/Projet-CIR2?type=design&node-id=0%3A1&t=uJOvn6MFgd1tnlXz-1).

## Développement

Pour mettre en place les linters HTML & JS, il vous faut npm, puis executez les commandes suivantes:

```bash
npm init -y
npm install eslint eslint-config-airbnb-base eslint eslint-plugin-import htmlhint
```

## Ressources

### Logiciels utilisés 

- [Figma](https://www.figma.com/) pour la conception de la maquette  
- [JMerise](https://www.jfreesoft.com/JMerise/) pour la conception du MCD / MPD  

### Images & Icônes

- [Bootstrap Icons](https://icons.getbootstrap.com/) icônes pour le site web

### Musiques

- [Musique libre de droit](https://pixabay.com/music/search/cc0/) pour les musiques de test

