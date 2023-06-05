/**
 * Fonction pour charger les musiques écoutées appelé par le bouton du menu
 */
function loadListened() {
  loadTrackPage('../php/request.php/listened', 'Musiques écoutées');
}


function checkBox() {
  const boxes = document.querySelectorAll('.box');
  const triggerBottom = (window.innerHeight / 10) * 6;
  boxes.forEach((box, index) => {
    //console.log("yo");
    box.addEventListener('click', () => {
      box.classList.add('go');
      //console.log('yop');
      const child = box.childNodes;
      //console.log(child);
      if (child.length !== 2) {
        //console.log('salut');
      }
      if (child.length === 2) {
        const rect = document.createElement('div');
        rect.classList.add('blue-rect');
        box.appendChild(rect);
      }
      boxes.forEach((otherBox, otherIndex) => {
        // Vérifie si la boîte est différente de celle cliquée
        if (otherBox === box) {
          otherBox.classList.remove('go2');
          otherBox.classList.remove('go3');
        }
        if (otherBox !== box) {
          // Supprime la classe "go" et "go2" des autres boîtes
          otherBox.classList.remove('go');
          otherBox.classList.remove('go2');
          otherBox.classList.remove('go3');
          const rect = otherBox.querySelector('.blue-rect');
          if (rect) {
            rect.remove();
          }
        }
        if (otherIndex === index - 1) {
          otherBox.classList.add('go2');
          otherBox.classList.remove('go3');
        }

        // Vérifie la boîte en dessous
        if (otherIndex === index + 1) {
          otherBox.classList.add('go2');
          otherBox.classList.remove('go3');
        }

        if (otherIndex === index - 2) {
          otherBox.classList.add('go3');
          otherBox.classList.remove('go2');
        }

        // Vérifie la boîte en dessous
        if (otherIndex === index + 2) {
          otherBox.classList.add('go3');
          otherBox.classList.remove('go2');
        }
      });
    });
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });
}
