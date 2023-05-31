CREATE DATABASE projet-cir2;
USE projet-cir2;
CREATE USER 'projetcir2'@'localhost' IDENTIFIED BY 'projetcir2';
GRANT ALL PRIVILEGES ON projet-cir2.* TO 'projetcir2'@'localhost';
FLUSH PRIVILEGES;
