/**
 * Fonction pour formater le temps
 * @param {*} time Temps à formatter
 * @returns Temps formaté en minutes : secondes
 */
function formatTime(time) {
  const times = time.split('.');
  return `${times[0]}:${times[1].substring(0, times[1].length - 1)}`;
}

/**
 * Fonction pour formatter une date en jj/mm/aaaa
 * @param {*} date Date à formatter
 * @returns Date formatée en jj/mm/aaaa
 */
function formatDate(date) {
  const dates = date.split('-');
  return `${dates[2]}/${dates[1]}/${dates[0]}`;
}

// Récupération des éléments
const home = document.getElementById('home');
const search = document.getElementById('recherche-icon');
const settings = document.getElementById('param');

// Gestion des évènements
if (home) {
  home.addEventListener('click', loadAccueil);
}
if (search) {
  search.addEventListener('click', loadRecherche);
}
if (settings) {
  settings.addEventListener('click', loadSettings);
}

const slider = document.querySelector('.slider');
const progress = document.querySelector('.progress');
const pin = document.querySelector('.pin');
const currentTimeElement = document.querySelector('.current-time');
const totalTimeElement = document.querySelector('.total-time');
const pauseButton = document.querySelector('#stop-go');

// Obtenir le temps total à partir de l'élément HTML
const totalDurationText = totalTimeElement.textContent;
const [minutes, seconds] = totalDurationText.split(':');
const totalDuration = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);

// Variables pour le temps écoulé, la barre de progression, l'intervalle et l'état de la pause
let currentTime = 0;
let progressWidth = 0;
let intervalId;
let isPaused = false; // Variable pour suivre l'état de la pause

// Fonction pour mettre à jour la barre de progression et le temps écoulé
function updateProgress() {
  progress.style.width = `${progressWidth}%`;
  currentTimeElement.textContent = formatTime(currentTime);
}

// Fonction pour gérer le déplacement du pin
function handlePinDrag(event) {
  // Calculer la position relative du déplacement
  const sliderRect = slider.getBoundingClientRect();
  const newPosition = (event.clientX - sliderRect.left) / sliderRect.width;

  // Limiter la position du pin dans les limites du slider
  const minPosition = 0;
  const maxPosition = 1;
  const clampedPosition = Math.max(
    minPosition,
    Math.min(maxPosition, newPosition),
  );

  // Mettre à jour le temps écoulé et la barre de progression en fonction de la position du pin
  currentTime = Math.floor(clampedPosition * totalDuration);
  progressWidth = (currentTime / totalDuration) * 100;
  updateProgress();
}

// Événement de déplacement du pin
pin.addEventListener('mousedown', () => {
  // Activer le suivi du déplacement du pin
  document.addEventListener('mousemove', handlePinDrag);

  // Désactiver la sélection de texte pendant le déplacement du pin
  document.addEventListener('selectstart', (e) => e.preventDefault());
});

// Événement de fin de déplacement du pin
document.addEventListener('mouseup', () => {
  // Désactiver le suivi du déplacement du pin
  document.removeEventListener('mousemove', handlePinDrag);
});

// Fonction pour mettre en pause ou relancer le défilement du temps
function togglePause() {
  isPaused = !isPaused; // Inverser l'état de la pause

  if (isPaused) {
    clearInterval(intervalId); // Arrêter l'intervalle
    // Désactiver le suivi du déplacement du pin lorsque la pause est activée
    document.removeEventListener('mousemove', handlePinDrag);
  } else {
    // Relancer le défilement du temps
    intervalId = setInterval(() => {
      currentTime += 1;
      progressWidth = (currentTime / totalDuration) * 100;
      updateProgress();

      // Vérifier si le temps écoulé a atteint le temps total
      if (currentTime >= totalDuration) {
        clearInterval(intervalId);
        // Autres actions à prendre lorsque le temps est terminé
      }
    }, 1000); // Mettez à jour toutes les secondes (ajustez selon vos besoins)
  }
}

// Événement de clic sur le bouton de pause
pauseButton.addEventListener('click', togglePause);

// Initialisation de la barre de progression et du temps écoulé
currentTimeElement.textContent = formatTime(currentTime);

// Mise à jour du temps écoulé et de la barre de progression de current_time à total_time
intervalId = setInterval(() => {
  if (!isPaused) {
    currentTime += 1;
    progressWidth = (currentTime / totalDuration) * 100;
    updateProgress();

    // Vérifier si le temps écoulé a atteint le temps total
    if (currentTime >= totalDuration) {
      clearInterval(intervalId);
      // Autres actions à prendre lorsque le temps est terminé
    }
  }
}, 1000); // Mettez à jour toutes les secondes (ajustez selon vos besoins)
>>>>>>> 8971427927961f33a0b4119a1f21788421fb2c83
