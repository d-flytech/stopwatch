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
            this.updateLapsDom();
            this.saveLapTimes();
        }
    }
    // berekenen van lap times (logic, pure function)
    updateLaps = () => {
        return this.lapTimes.map((lapTime, index) => {
            return `Lap ${index + 1}: ${this.formatTime(lapTime)}`;
        });
    }

    saveLapTimes = () => {
        sessionStorage.setItem('lapTimes', JSON.stringify(this.lapTimes));
    }
    //Dom update (presentation,impure function)
    updateLapsDom = () => {
        const laps = this.updateLaps();
        this.laps_el.innerHTML = '';
        laps.forEach(lapText => {
            const lap_el = document.createElement('div');
            lap_el.innerText = lapText;

            this.laps_el.appendChild(lap_el);
        });
    }
    
    //function initiële update van laps 
    initializeLaps = () => {
        this.updateLapsDOM();
    }
}


//een nieuw Stopwatch-object en roept de initializeLaps-methode aan
const stopwatch = new Stopwatch();
stopwatch.initializeLaps();

export default Stopwatch;





