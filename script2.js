import Stopwatch from './script.js';

window.addEventListener("DOMContentLoaded", () => {
    const stopwatchInstance = new Stopwatch();
    stopwatchInstance.initializeStopwatch();
   
    stopwatchInstance.start_btn.addEventListener('click', () => stopwatchInstance.start());
    stopwatchInstance.stop_btn.addEventListener('click', () => stopwatchInstance.stop());
    stopwatchInstance.reset_btn.addEventListener('click', () => stopwatchInstance.reset());
    stopwatchInstance.lap_btn.addEventListener('click', () => stopwatchInstance.lap());

});


