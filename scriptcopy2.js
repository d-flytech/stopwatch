import StopwatchCopy from './scriptcopy.js';

window.addEventListener("DOMContentLoaded", async () => {
    await makeStopwatches();
});

async function makeStopwatches() {
    const ids = ['stopwatch1', 'stopwatch2', 'stopwatch3', 'stopwatch4'];
    const stopwatches = await Promise.all(ids.map(async id => {
        const stopwatch = new StopwatchCopy({id});
        return stopwatch;
    }));

    await new Promise(resolve => setTimeout(resolve, 5000));

    stopwatches.forEach(stopwatch => {
        stopwatch.start();
    });

    await new Promise(reject => setTimeout(reject, 10000));

    stopwatches.forEach(stopwatch => {
        stopwatch.stop();
    });
        
    
}

