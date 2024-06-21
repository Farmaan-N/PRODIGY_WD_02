let startTime, timerInterval, elapsedTime = 0, isRunning = false;

const timeDisplay = document.getElementById('time-display');
const startStopBtn = document.getElementById('start-stop-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');
const lapsContainer = document.getElementById('laps');

startStopBtn.addEventListener('click', toggleTimer);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetTimer);

function toggleTimer() {
    isRunning ? stopTimer() : startTimer();
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startStopBtn.textContent = 'Stop';
    lapBtn.disabled = false;
    resetBtn.disabled = true;
    isRunning = true;
}

function stopTimer() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = false;
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    timeDisplay.textContent = '00:00:00.000';
    lapsContainer.innerHTML = '';
    elapsedTime = 0;
    isRunning = false;
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
}

function updateTime() {
    const time = Date.now() - startTime;
    timeDisplay.textContent = formatTime(time);
}

function formatTime(time) {
    const minutes = String(Math.floor(time / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(time % 1000).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    const lapTime = Date.now() - startTime;
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap');
    lapElement.textContent = formatTime(lapTime);
    lapsContainer.appendChild(lapElement);
}
