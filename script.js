window.addEventListener("DOMContentLoaded", () => {
    new Stopwatch();
});

class Stopwatch {
    constructor() {
        this.time_el = document.querySelector('.watch .time');
        this.start_btn = document.getElementById('start');
        this.stop_btn = document.getElementById('stop');
        this.reset_btn = document.getElementById('reset');
        this.lap_btn = document.getElementById('lap');
        this.laps_el = document.querySelector('.watch .laps');

        this.seconds = 0;
        this.interval = null;
        this.lapTimes = JSON.parse(sessionStorage.getItem('lapTimes')) || [];// sessionStorage i.p.v. localStorage gebruikt

        // arrow functions gebruikt i.p.v. binden voor event listeners
        this.start_btn.addEventListener('click', this.start);
        this.stop_btn.addEventListener('click', this.stop);
        this.reset_btn.addEventListener('click', this.reset);
        this.lap_btn.addEventListener('click', this.lap);

        this.updateLaps();
    }

    // methodes als arrow functions gedefinieerd i.p.v. binden
    formatTime = (seconds) => {
        const hrs = `${Math.floor(seconds / 3600)}`.padStart(2, '0');
        const min = `${Math.floor((seconds % 3600) / 60)}`.padStart(2, '0');
        const secs = `${seconds % 60}`.padStart(2, '0');

        return `${hrs}:${min}:${secs}`;
    }

    timer = () => {
        this.seconds++;
        this.time_el.innerText = this.formatTime(this.seconds);
    }

    start = () => {
        if (this.interval) return;
        this.interval = setInterval(this.timer, 1000);
    }

    stop = () => {
        clearInterval(this.interval);
        this.interval = null;
    }

    reset = () => {
        this.stop();
        this.seconds = 0;
        this.time_el.innerText = this.formatTime(this.seconds);
        this.laps_el.innerHTML = '';
        this.lapTimes = [];

        sessionStorage.removeItem('lapTimes');
    }

    lap = () => {
        if (this.interval) {
            this.lapTimes.push(this.seconds);
            this.updateLaps();
            this.saveLapTimes();
        }
    }

    updateLaps = () => {
        this.laps_el.innerHTML = '';
        this.lapTimes.forEach((lapTime, index) => {
            const lap_el = document.createElement('div');
            lap_el.innerText = `Lap ${index + 1}: ${this.formatTime(lapTime)}`;

            this.laps_el.appendChild(lap_el);
        });
    }

    saveLapTimes = () => {
        sessionStorage.setItem('lapTimes', JSON.stringify(this.lapTimes));
    }
}


