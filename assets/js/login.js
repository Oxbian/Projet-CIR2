const loginBtn = document.getElementById('login-btn');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    // Récupération des valeurs des champs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Vérification des champs
    if (email === '' || password === '') {
      document.getElementById('errors').innerHTML = '<strong>Veuillez remplir tous les champs</strong>';
      document.getElementById('errors').style.display = 'block';
      return;
    }

    // Requête AJAX
    const data = `email=${email}&password=${password}`;
    ajaxRequest('POST', 'http://projet:64950/Projet-CIR2/php/request.php/authentification', (response) => {
      if (response === 404 || response === 400) {
        document.getElementById('errors').innerHTML = '<strong>Email ou mot de passe incorrect</strong>';
        document.getElementById('errors').style.display = 'block';
      } else {
        document.location.href = 'accueil.html';
      }
    }, data);
  });
}
