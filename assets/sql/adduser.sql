CREATE DATABASE projet_web DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'projetweb'@'localhost' IDENTIFIED BY 'projetweb';
GRANT ALL PRIVILEGES ON projet_web.* TO 'projetweb'@'localhost';
FLUSH PRIVILEGES;