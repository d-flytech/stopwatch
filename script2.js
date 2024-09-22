import Stopwatch from './script.js';

const stopwatch = new Stopwatch();


// Setting up event listeners
window.addEventListener("DOMContentLoaded", () => {
    initializeStopwatch();
    document.getElementById('start').addEventListener('click', startStopwatch);
    document.getElementById('stop').addEventListener('click', stopStopwatch);
    document.getElementById('reset').addEventListener('click', resetStopwatch);
});

// Function definitions
function startStopwatch() {
    stopwatch.start();
}

function stopStopwatch() {
    stopwatch.stop();
}

function resetStopwatch() {
    stopwatch.reset();
}

function initializeStopwatch() {
    stopwatch.initializeLaps();
}
