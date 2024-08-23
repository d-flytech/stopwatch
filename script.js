window.addEventListener("DOMContentLoaded", () => {
    new Stopwatch();
});

class Stopwatch {
    constructor() {

        const time_el = document.querySelector('.watch .time');
        const start_btn = document.getElementById('start');
        const stop_btn = document.getElementById('stop');
        const reset_btn = document.getElementById('reset');
        const lap_btn = document.getElementById('lap');
        const laps_el = document.querySelector('.watch .laps');

        let seconds = 0;
        let interval = null;
        let lapTimes = JSON.parse(localStorage.getItem('lapTimes')) || [];

        start_btn.addEventListener('click', start);
        stop_btn.addEventListener('click', stop);
        reset_btn.addEventListener('click', reset);
        lap_btn.addEventListener('click', lap);

        updateLaps();

        function formatTime(seconds) {
            const hrs = `${Math.floor(seconds / 3600)}`.padStart(2, '0');
            const min = `${Math.floor((seconds % 3600) / 60)}`.padStart(2, '0');
            const secs = `${seconds % 60.}`.padStart(2, '0');

            return `${hrs}:${min}:${secs}`;
        }

        function timer() {
            seconds++;
            time_el.innerText = formatTime(seconds);
        }

        function start() {
            if (interval) {
                return
            }
            interval = setInterval(timer, 1000);
        }

        function stop() {
            clearInterval(interval);
            interval = null;
        }

        function reset() {
            stop();
            seconds = 0;
            time_el.innerText = formatTime(seconds);
            laps_el.innerHTML = '';
            lapTimes = [];

            localStorage.removeItem('lapTimes');
        }

        function lap() {
            if (interval) {
                lapTimes.push(seconds);
                updateLaps();
                saveLapTimes();
            }
        }

        function updateLaps() {
            laps_el.innerHTML = '';
            lapTimes.forEach((lapTime, index) => {
                const lap_el = document.createElement('div');
                lap_el.innerText = `Lap ${index + 1}: ${formatTime(lapTime)}`;

                laps_el.appendChild(lap_el);
            });
        }
        
        function saveLapTimes() {
            localStorage.setItem('lapTimes', JSON.stringify(lapTimes));
        }

    }

}

