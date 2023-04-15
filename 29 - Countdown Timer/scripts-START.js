let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
    clearInterval(countdown); // clear all the running intervals before running other functions

    const now = Date.now(); // get the time now
    const then = now + seconds * 1000; // get the target time

    displayTimeLeft(seconds); // runs immediately first rather than waiting for the first 1 second
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        if (secondsLeft < 0) { // when it hits 0, stops running
            clearInterval(countdown)
            return 
        }
        displayTimeLeft(secondsLeft)
    }, 1000) // run every second, but this will run after one second
}

// displays the time left
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

// displays the end time
function displayEndTime(timestamp) {
    const end = new Date(timestamp); // create a Date object using a timestamp
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// called when eventlistener is triggered
function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// Add eventlistener to the customform
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const min = this.minutes.value;
    const seconds = min * 60;
    timer(seconds);
    this.reset(); // erase the value typed in
})