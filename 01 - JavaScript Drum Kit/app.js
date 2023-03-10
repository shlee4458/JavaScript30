/** When Keydown, playSound */
window.addEventListener('keydown', playSound)

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}

/** For each keys, if the transition is over, remove transition */
const keys = document.querySelectorAll(".key")
keys.forEach(key => key.addEventListener('transitionend', removeTransition))

function removeTransition(e) {
    if (e.propertyName != 'transform') return;
    this.classList.remove('playing');
}