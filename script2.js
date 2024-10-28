import Stopwatch from './script.js';

window.addEventListener("DOMContentLoaded", () => {
    ['stopwatch1', 'stopwatch2', 'stopwatch3'].forEach(id => {
        const stopwatch = new Stopwatch({ id });
        stopwatch.initializeLaps();
    });

});


