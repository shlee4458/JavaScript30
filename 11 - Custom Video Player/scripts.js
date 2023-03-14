/** Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer'); // inside the player get the video

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]') // has an attribute called data-skip
const ranges = player.querySelectorAll('.player__slider');

/** Build out functions */
function togglePlay() {// pause is a property within video
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
    const method = video.paused ? 'play' : 'pause'; // the method we want to call
    video[method](); // find the method and call that method;
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`; // assign the flexBasis style to percent variable
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/** Hook up the events with event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton); // when video is playing update the button
video.addEventListener('pause', updateButton); // when video is paused update the button
video.addEventListener('timeupdate', handleProgress); // when the time is changed in the video

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // scrub is executed only when the mouse is down
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


