#!/bin/bash

# Installation des paquets nécessaires
sudo apt install apache2 libapache2-mod-php mariadb-server php php-mysql git
# Configuration d'apache2
sudo systemctl enable apache2
sudo systemctl start apache2

# Configuration de mariaDB
sudo systemctl start mariadb.service
echo "Attention refusez l'installation de VALIDATE PASSWORD plugin!!"
sudo mysql_secure_installation

# Configuration du vhost
sudo mkdir -p /var/www/projet-cir2
sudo chown -R $USER:$USER /var/www/projet-cir2
cd /var/www/projet-cir2
git clone https://github.com/Oxbian/Projet-CIR2.git
sudo tee -a /etc/apache2/sites-available/prj-web-cir2-grp-56.conf << EOF
<VirtualHost *:80>
	ServerName prj-web-cir2-grp-56
	ServerAlias www.prj-web-cir2-grp-56
	DocumentRoot "/var/www/projet-cir2"
	<Directory "/var/www/projet-cir2">
		Options FollowSymLinks
		AllowOverride all
		Require all granted
	</Directory>
	ErrorLog /var/log/apache2/error-prj-grp-56.log
	CustomLog /var/log/apache2/access-prj-grp-56.log combined
</VirtualHost>
EOF

sudo a2ensite prj-web-cir2-grp-56.conf
sudo a2dissite 000-default
sudo systemctl reload apache2

# Configuration de Phpmyadmin
sudo apt install phpmyadmin php-mbstring php-zip php-gd php-json php-curl
sudo phpenmod mbstring
sudo systemctl restart apache2
