/**
 * Fonction pour vérifier le bon formattage d'un email
 * @param {*} email Email à vérifier
 * @returns Booléen true si l'email est valide, false sinon
 */
function checkEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

/**
 * Fonction pour vérifier le bon formattage d'un mot de passe
 * @param {*} password Mot de passe à vérifier
 * @returns Booléen true si le mot de passe est valide, false sinon
 */
function checkPassword(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
}

/**
 * Fonction pour vérifier si deux mots de passe sont identiques
 * @param {*} password Mot de passe
 * @param {*} confirmPassword Mot de passe de confirmation
 * @returns Booléen true si les mots de passe sont identiques, false sinon
 */
function checkPasswords(password, confirmPassword) {
  return password === confirmPassword;
}

/**
 * Fonction pour envoyer un message d'erreur
 * @param {*} message Message d'erreur à envoyé
 * @param {*} color Couleur du message d'erreur
 */
function sendErrorMessage(message, color = 'red') {
  const error = document.getElementById('errors');
  error.style.color = color;
  error.innerHTML = `<strong>${message}</strong>`;
  error.style.display = 'block';
  // Affichage du message d'erreur après 5 secondes
  setTimeout(() => {
    clearErrorMessage();
  }, 5000);
}

/**
 * Fonction pour supprimer le message d'erreur
 */
function clearErrorMessage() {
  const error = document.getElementById('errors');
  error.innerHTML = '';
  error.style.display = 'none';
}
