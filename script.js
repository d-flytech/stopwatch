class Stopwatch {
    constructor(options) {
        this.options = options || {};
        this.id = this.options.id || `stopwatch-${Date.now()}`;

        this.createHtml();

        this.watch_el = document.getElementById(this.id);
        this.time_el = this.watch_el.querySelector('.time');
        this.start_btn = this.watch_el.querySelector('.start');
        this.stop_btn = this.watch_el.querySelector('.stop');
        this.reset_btn = this.watch_el.querySelector('.reset');
        this.lap_btn = this.watch_el.querySelector('.lap');
        this.laps_el = this.watch_el.querySelector('.laps');

        this.seconds = 0;
        this.interval = null;
        this.lapTimes = JSON.parse(sessionStorage.getItem(`${this.id}-lapTimes`)) || [];// sessionStorage i.p.v. localStorage gebruikt

        // arrow functions gebruikt i.p.v. binden voor event listeners
        this.start_btn.addEventListener('click', this.start);
        this.stop_btn.addEventListener('click', this.stop);
        this.reset_btn.addEventListener('click', this.reset);
        this.lap_btn.addEventListener('click', this.lap);

        this.initializeLaps();
    }

    createHtml() {
        const container = document.createElement('div');
        container.id = this.id;
        container.classList.add('watch');
        container.innerHTML = `
        <div class="time">00:00:00</div>
        <div class="controls">
            <button class='start'>start</button>
            <button class='stop'>stop</button>
            <button class='reset'>reset</button>
            <button class='lap'>lap</button>
        </div>
        <div class="laps"></div> `;

        document.body.appendChild(container);
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

        sessionStorage.removeItem(`${this.id}-lapTimes`);
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
        sessionStorage.setItem(`${this.id}-lapTimes`, JSON.stringify(this.lapTimes));
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
        this.updateLapsDom();
    }
}

export default Stopwatch;





