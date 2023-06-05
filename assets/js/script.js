var home = document.getElementById("home");
var search = document.getElementById("rechercheIcon");

home.addEventListener("click", function () {
  window.location.href = "accueil.html";
});

search.addEventListener("click", function () {
  window.location.href = "rechercheAlbum.html";
});
// Sélectionner les éléments nécessaires
const slider = document.querySelector(".slider");
const progress = document.querySelector(".progress");
const pin = document.querySelector(".pin");
const currentTimeElement = document.querySelector(".current-time");
const totalTimeElement = document.querySelector(".total-time");
const pauseButton = document.querySelector("#stopGo"); // Sélectionner le bouton de pause par son ID

// Obtenir le temps total à partir de l'élément HTML
const totalDurationText = totalTimeElement.textContent;
const [minutes, seconds] = totalDurationText.split(":");
const totalDuration = parseInt(minutes) * 60 + parseInt(seconds);

// Variables pour le temps écoulé, la barre de progression, l'intervalle et l'état de la pause
let currentTime = 0;
let progressWidth = 0;
let intervalId;
let isPaused = false; // Variable pour suivre l'état de la pause

// Fonction pour formater le temps au format mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

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
    Math.min(maxPosition, newPosition)
  );

  // Mettre à jour le temps écoulé et la barre de progression en fonction de la position du pin
  currentTime = Math.floor(clampedPosition * totalDuration);
  progressWidth = (currentTime / totalDuration) * 100;
  updateProgress();
}

// Événement de déplacement du pin
pin.addEventListener("mousedown", () => {
  // Activer le suivi du déplacement du pin
  document.addEventListener("mousemove", handlePinDrag);

  // Désactiver la sélection de texte pendant le déplacement du pin
  document.addEventListener("selectstart", (e) => e.preventDefault());
});

// Événement de fin de déplacement du pin
document.addEventListener("mouseup", () => {
  // Désactiver le suivi du déplacement du pin
  document.removeEventListener("mousemove", handlePinDrag);
});

// Fonction pour mettre en pause ou relancer le défilement du temps
function togglePause() {
  isPaused = !isPaused; // Inverser l'état de la pause

  if (isPaused) {
    clearInterval(intervalId); // Arrêter l'intervalle
    // Désactiver le suivi du déplacement du pin lorsque la pause est activée
    document.removeEventListener("mousemove", handlePinDrag);
  } else {
    // Relancer le défilement du temps
    intervalId = setInterval(() => {
      currentTime++;
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
pauseButton.addEventListener("click", togglePause);

// Initialisation de la barre de progression et du temps écoulé
currentTimeElement.textContent = formatTime(currentTime);
updateProgress();

// Mise à jour du temps écoulé et de la barre de progression de current_time à total_time
intervalId = setInterval(() => {
  if (!isPaused) {
    currentTime++;
    progressWidth = (currentTime / totalDuration) * 100;
    updateProgress();

    // Vérifier si le temps écoulé a atteint le temps total
    if (currentTime >= totalDuration) {
      clearInterval(intervalId);
      // Autres actions à prendre lorsque le temps est terminé
    }
  }
}, 1000); // Mettez à jour toutes les secondes (ajustez selon vos besoins)


