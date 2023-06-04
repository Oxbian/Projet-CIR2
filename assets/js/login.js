/**
 * Fonction pour connecter l'utilisateur, ajout du token dans les cookies si réussite
 */
function validateLogin() {
  // Récupération des valeurs des champs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Vérification des champs
  if (email === '' || password === '') {
    sendErrorMessage('Veuillez remplir tous les champs');
    return;
  }
  console.log(`${email}:${password}`);
  Cookies.set('login', email);

  // Requête AJAX pour récupérer le cookie de session
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '../php/request.php/authentification');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(`${email}:${password}`));

  xhr.onload = () => {
    switch (xhr.status) {
      case 200:
        Cookies.set('token', xhr.responseText);
        sendErrorMessage('Authentification réussite !', 'green');
        document.location.href = 'accueil.html';
        break;

      default:
        sendErrorMessage('Email ou mot de passe incorrect');
        break;
    }
  };

  xhr.send();
}

const loginBtn = document.getElementById('login-btn');

if (loginBtn) {
  loginBtn.addEventListener('click', validateLogin);
}
