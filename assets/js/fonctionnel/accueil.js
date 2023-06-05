/**
 * Fonction pour ouvrir le menu
 */
function openMenu() {
  circle.classList.toggle('clicked');
  const isVisible = rect1.classList.toggle('visible');
  rect2.classList.toggle('visible');
  rect3.classList.toggle('visible');

  if (isVisible) {
    rect1.addEventListener('click', () => {
      loadListened();
    });
  }
  if (isVisible) {
    rect2.addEventListener('click', () => {
      loadPlaylists();
    });
  }
  if (isVisible) {
    rect3.addEventListener('click', () => {
      window.location.href = 'playlists.html';
    });
  }
}

/**
 * Fonction pour charger le contenu de la page d'accueil
 */
function loadAccueil() {
  document.getElementById(
    'main',
  ).innerHTML = `<div class="container"><!-- Boutons principaux -->
   <div id="rect1">Mes Morceaux</div><div id="rect2">Mes playlists</div><div id="rect3">Mes favoris</div>
   <div id="circle"></div></div>`;

  let circle = document.getElementById('circle');
  let rect1 = document.getElementById('rect1');
  let rect2 = document.getElementById('rect2');
  let rect3 = document.getElementById('rect3');

  // Ajout des événements
  if (circle) {
    circle.addEventListener('click', openMenu);
  }
}

