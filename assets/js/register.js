const registerBtn = document.getElementById('register-btn');

if (registerBtn) {
  registerBtn.addEventListener('click', () => {
    // Récupération des valeurs des champs
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const datenaissance = document.getElementById('date-naissance').value;
    const password = document.getElementById('password').value;

    // Vérification des champs
    if (nom === '' || prenom === '' || email === '' || datenaissance === '' || password === '') {
      document.getElementById('errors').innerHTML = '<strong>Veuillez remplir tous les champs</strong>';
      document.getElementById('errors').style.display = 'block';
      return;
    }

    // Requête AJAX
    const data = `email=${email}&prenom=${prenom}&nom=${nom}&date_naissance=${datenaissance}&password=${password}`;
    ajaxRequest('POST', 'http://projet:64950/Projet-CIR2/php/request.php/user', (response) => {
      if (response === 409 || response === 400) {
        document.getElementById('errors').innerHTML = '<strong>Utilisateur existant</strong>';
        document.getElementById('errors').style.display = 'block';
      } else {
        document.location.href = 'login.html';
      }
    }, data);
  });
}
