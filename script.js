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
        let lapCount = 0;

        start_btn.addEventListener('click', start);
        stop_btn.addEventListener('click', stop);
        reset_btn.addEventListener('click', reset);
        lap_btn.addEventListener('click', lap);



        function timer() {
            seconds++;

            const hrs = String(Math.floor(seconds / 3600)).toString().padStart(2, '0');
            const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
            const secs = String(seconds % 60).padStart(2, '0');

            time_el.innerText = `${hrs}:${min}:${secs}`;
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
            time_el.innerText = `00:00:00`;
            laps_el.innerHTML = '';
            lapCount= 0;
        }

        function lap() {
            if (interval) {
                lapCount++;
                const hrs = String(Math.floor(seconds / 3600)).toString().padStart(2, '0');
                const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
                const secs = String(seconds % 60).padStart(2, '0');
    
                const lapTime = `${hrs}:${min}:${secs}`;

                const lap_el = document.createElement('div');
                lap_el.innerText = `Lap ${lapCount}: ${lapTime}`;
                laps_el.appendChild(lap_el);
                stop();
            }
        }


    }

}