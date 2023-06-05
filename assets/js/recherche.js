function loadRecherche() {
  document.getElementById('main').innerHTML = '<div class="container"><div class="info"><div class="cherche"><div class="artiste"></div><div class="album text">Album</div><div class="morceau text">Morceau</div><div class="nom text">Titre</div></div></div><div id="liste-morceau1"><div class="box show"><h2>contenue</h2></div><div class="box"><h2>contenue</h2></div><div class="box"><h2>contenue</h2></div></div></div>';

  // Récupération des éléments
  let album = document.querySelector('.album');
  let morceau = document.querySelector('.morceau');
  let artist = document.querySelector('.nom');
  let rect = document.querySelector('.blue-rect');
  let boxes = document.querySelectorAll('.box');
  let container = document.getElementById('liste-morceau1');

  // Ajout des événements
  album.addEventListener('click', loadRecherche);
  morceau.addEventListener('click', loadRecherche);
  artist.addEventListener('click', loadRecherche);
  container.addEventListener('wheel', checkBoxes);

  // AJAX loadObjets pour les albums, artistes, musiques
}