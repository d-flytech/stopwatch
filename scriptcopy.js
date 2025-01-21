class StopwatchCopy {
    constructor(options) {
        this.options = options || {};
        this.id = this.options.id || `stopwatch-${Date.now()}`;

        this.createHTML();

        this.watch_el = document.getElementById(this.id);
        this.time_el = this.watch_el.querySelector(".time");
        this.start_btn = this.watch_el.querySelector(".start");
        this.stop_btn = this.watch_el.querySelector(".stop");
        this.reset_btn = this.watch_el.querySelector(".reset");
        this.lap_btn = this.watch_el.querySelector(".lap");
        this.lap_el = this.watch_el.querySelector(".laps");

     

        this.start_btn.addEventListener("click", this.start);
        this.stop_btn.addEventListener("click" , this.stop);
        this.reset_btn.addEventListener("click" , this.reset);
        this.lap_btn.addEventListener("click" , this.lap);

        this.seconds = 0;
        this.interval = null;
        this.laps = this.loadLaps() || [];
        this.renderLaps();

    }

    createHTML() {
        document.getElementById("stopwatch-box").insertAdjacentHTML(
            'beforeend', `<div id="${this.id}" class="watch">
                <div class="time">00:00:00</div>
                <div class="controls">
                ${['start', 'stop', 'reset', 'lap'].map(action => `<button class='${action}'>${action}</button>`).join('')}
                </div>
                <div class="laps"></div>
                </div>`
        );

    }

    loadLaps = () => {
        return JSON.parse(sessionStorage.getItem(this.id));
    }

    formatTime = (seconds) => {
        const hours = `${Math.floor(seconds / 3600)}`.padStart(2, '0');
        const min = `${Math.floor((seconds % 3600) / 60) }`.padStart(2, '0');
        const secs = `${Math.floor(seconds % 60)}`.padStart(2, '0');

        return `${hours}:${min}:${secs}`;
    }

    timer = () => {
        this.seconds++;
        this.time_el.innerText = this.formatTime(this.seconds);
    }

    start = () => {
        if (this.interval) return
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
        this.laps = [];//reset laps
        sessionStorage.removeItem(this.id);//clear laps from sessionStorage
        this.renderLaps();//clear laps display

    }

    lap = () => {
        const currentTime = this.formatTime(this.seconds);
        this.laps.push(currentTime);
        sessionStorage.setItem(this.id, JSON.stringify(this.laps));
        this.renderLaps();
    }


    renderLaps = () => {
        this.lap_el.innerHTML = this.laps.map((lap, index) =>`<div class="lapColor">Lap ${index + 1}: ${lap}</div>`).join('');
    }
}

export default StopwatchCopy;
