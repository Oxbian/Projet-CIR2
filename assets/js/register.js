// Récupération des éléments
const registerBtn = document.getElementById('register-btn');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('password2');

/**
 * Fonction pour créer un utilisateur
 */
function createUser() {
  // Récupération des valeurs des champs
  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const email = document.getElementById('email').value;
  const datenaissance = document.getElementById('date-naissance').value;
  const password = passwordInput.value;

  // Vérification des champs
  if (nom === '' || prenom === '' || email === '' || datenaissance === '' || password === '') {
    sendErrorMessage('Veuillez remplir tous les champs');
    return;
  }

  // Requête AJAX
  const data = `email=${email}&prenom=${prenom}&nom=${nom}&date_naissance=${datenaissance}&password=${password}`;
  ajaxRequest('POST', '../php/request.php/user', (response) => {
    if (response === 409 || response === 400) {
      sendErrorMessage('Utilisateur existant');
    } else {
      sendErrorMessage('Vous êtes bien inscrit, vous allez être redirigé vers la page de connexion', 'green');
      document.location.href = 'login.html';
    }
  }, data);
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

if (registerBtn) {
  registerBtn.addEventListener('click', createUser);
}
