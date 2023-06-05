/**
 * Fonction pour réaliser des requêtes AJAX
 * @param {*} type Type de la requête (POST, GET, PUT, DELETE)
 * @param {*} _url URL de la requête
 * @param {*} callback Fonction à executéer après la requête
 * @param {*} data Data à envoyer avec la requête
 */
function ajaxRequest(type, _url, callback, data = null) {
  let url = _url;

  // Création de l'objet XMLHttpRequest
  const xhr = new XMLHttpRequest();
  if (type === 'GET' && data != null) {
    url += `?${data}`;
  }
  xhr.open(type, url);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get('token'));

  // Ajout de la fonction de retour
  xhr.onload = () => {
    switch (xhr.status) {
      case 200:
      case 201:
        if (xhr.responseText) { // Si la réponse n'est pas vide ou false
          callback(JSON.parse(xhr.responseText));
        } else {
          callback();
        }
        break;

      default:
        callback(xhr.status);
        break;
    }
  };
  // Envoi de la requête
  xhr.send(data);
}
