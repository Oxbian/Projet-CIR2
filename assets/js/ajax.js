// Fonction pour réaliser des requêtes AJAX
function ajaxRequest(type, _url, callback, data = null) {
  let url = _url;

  // Création de l'objet XMLHttpRequest
  const xhr = new XMLHttpRequest();
  if (type === 'GET' && data != null) {
    url += `?${data}`;
  }
  xhr.open(type, url);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

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
