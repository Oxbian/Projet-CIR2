/**
 * Fonction pour modifier les informations de l'utilisateur
 */
function updateSettings() {
  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const datenaissance = document.getElementById('date-naissance').value;
  const password = document.getElementById('password').value;

  // Vérification des champs
  if (nom === '' || prenom === '' || datenaissance === '' || password === '') {
    sendErrorMessage('Veuillez remplir tous les champs');
    return;
  }

  // Requête AJAX
  const data = `prenom=${prenom}&nom=${nom}&date_naissance=${datenaissance}&password=${password}`;
  ajaxRequest('PUT', '../php/request.php/user', (response) => {
    if (response === 401 || response === 400) {
      sendErrorMessage('Utilisateur non connecté');
    } else {
      sendErrorMessage('Vos modifications ont bien été prises en comptes', 'green');
      loadSettings();
    }
  }, data);
}

/**
 * Fonction pour se déconnecter de l'application
 */
function disconnect() {
  // Suppression du token
  Cookies.remove('token');
  // Redirection vers la page de connexion
  window.location.href = 'login.html';
}

/**
 * Fonction pour charger la page de modification des paramètres
 */
function loadChangeSettings() {
  document.getElementById('main').innerHTML = `<div class="container row"><div id="errors"><p>Error 404</p></div>
  <div class="form"><form action="" method="get"><label for="nom">Nom</label><input type="text" name="nom" id="nom" placeholder="Nom">
  <label for="prenom">Prénom</label><input type="text" name="prenom" id="prenom" placeholder="Prénom"><label for="date-naissance">Date de naissance</label>
  <input type="date" name="date-naissance" id="date-naissance"><label for="password">Mot de passe</label>
  <input type="password" name="password" id="password" placeholder="Mot de passe"><label for="password2">Confirmer le mot de passe</label>
  <input type="password" name="password2" id="password2" placeholder="Confirmer le mot de passe"></form>
  </div><div class="button"><a class="btn btn-secondary" id="cancel">Annuler</a><a class="btn btn-primary" id="update">Enregistrer</a></div></div>`;

  // Récupération des éléments
  const cancelBtn = document.getElementById('cancel');
  const updateBtn = document.getElementById('update');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('password2');

  // Ajout des événements
  if (cancelBtn) {
    cancelBtn.addEventListener('click', loadSettings);
  }
  if (updateBtn) {
    updateBtn.addEventListener('click', updateSettings);
  }

  // Vérification du mot de passe et de la confirmation du mot de passe
  if (passwordInput && confirmPasswordInput) {
    passwordInput.addEventListener('input', () => {
      if (checkPassword(passwordInput.value) === false) {
        sendErrorMessage('Le mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule et un chiffre');
      } else {
        clearErrorMessage();
      }
    });

    confirmPasswordInput.addEventListener('input', () => {
      if (checkPasswords(passwordInput.value, confirmPasswordInput.value) === false) {
        sendErrorMessage('Les mots de passe ne correspondent pas');
      } else {
        clearErrorMessage();
      }
    });
  }
}

/**
 * Fonction qui permet de charger la page utilisateur
 */
function loadSettings() {
  document.getElementById('main').innerHTML = `<div class="container row"><div id="errors"><p>Error 404</p></div><div><h2 class="title">Utilisateur</h2><div class="parameters"><h3>Nom: </h3><p id="nom"></p>
    </div><div class="parameters"><h3>Prénom: </h3><p id="prenom"></p></div><div class="parameters"><h3>Date de naissance: </h3><p id="date-naissance"></p></div>
    <div class="parameters"><h3>Email: </h3><p id="email"></p></div></div><div class="container row"><a class="btn btn-primary" id="change-settings">Modifier</a>
    <a class="btn btn-secondary" id="disconnect">Déconnexion</a></div></div>`;

  // Récupération des éléments
  const changeSettingsBtn = document.getElementById('change-settings');
  const disconnectBtn = document.getElementById('disconnect');

  // Ajout des événements
  if (changeSettingsBtn) {
    changeSettingsBtn.addEventListener('click', loadChangeSettings);
  }
  if (disconnectBtn) {
    disconnectBtn.addEventListener('click', disconnect);
  }

  // Requête AJAX
  ajaxRequest('GET', '../php/request.php/user', (response) => {
    if (response === 401 || response === 400) {
      sendErrorMessage('Utilisateur non connecté');
    } else {
      document.getElementById('nom').innerHTML = response.nom;
      document.getElementById('prenom').innerHTML = response.prenom;
      document.getElementById('date-naissance').innerHTML = response.date_naissance;
      document.getElementById('email').innerHTML = response.email;
    }
  });
}
