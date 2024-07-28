window.addEventListener("DOMContentLoaded", () => {

    const time_el = document.querySelector('.watch .time');
    const start_btn = document.getElementById('start');
    const stop_btn = document.getElementById('stop');
    const reset_btn = document.getElementById('reset');


    let seconds = 0;
    let interval = null;

    start_btn.addEventListener('click', start);
    stop_btn.addEventListener('click', stop);
    reset_btn.addEventListener('click', reset);


    function timer() {
        seconds++;
        
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');

        time_el.innerText = `${hrs} : ${min} : ${secs}`;
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
    }

});