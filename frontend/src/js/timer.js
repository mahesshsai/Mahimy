document.addEventListener('DOMContentLoaded', () => {
    const timerText = document.getElementById('timer-text');
    const progressBar = document.getElementById('progress-bar');
    const startPauseBtn = document.getElementById('start-pause');
    const stopBtn = document.getElementById('stop');
    const resetBtn = document.getElementById('reset');
    const lapseBtn = document.getElementById('lapse');
    const clearLapseLogsBtn = document.getElementById('clear-lapse-logs');
    const lapseLogs = document.getElementById('lapse-logs');
    let timerInterval;
    let timeRemaining = 0;
    let isPaused = true;

    // Pomodoro Time Settings
    const POMODORO_TIME = 25 * 60 * 1000; // 25 minutes
    const SHORT_BREAK_TIME = 5 * 60 * 1000; // 5 minutes
    const LONG_BREAK_TIME = 15 * 60 * 1000; // 15 minutes

    // Update Timer Display
    function updateDisplay(time) {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        timerText.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        progressBar.style.width = `${100 - (time / POMODORO_TIME) * 100}%`;
    }

    // Timer Logic
    function startTimer(duration) {
        timeRemaining = duration;
        isPaused = false;
        timerInterval = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                isPaused = true;
                // Handle completion (e.g., notify user, change state)
            } else {
                timeRemaining -= 1000;
                updateDisplay(timeRemaining);
            }
        }, 1000);
    }

    function handleStartPause() {
        if (isPaused) {
            startTimer(POMODORO_TIME); // Start a Pomodoro timer by default
            startPauseBtn.textContent = 'Pause';
        } else {
            clearInterval(timerInterval);
            isPaused = true;
            startPauseBtn.textContent = 'Start';
        }
    }

    function handleStop() {
        clearInterval(timerInterval);
        isPaused = true;
        startPauseBtn.textContent = 'Start';
        updateDisplay(POMODORO_TIME); // Reset to initial state
    }

    function handleReset() {
        clearInterval(timerInterval);
        isPaused = true;
        startPauseBtn.textContent = 'Start';
        updateDisplay(POMODORO_TIME); // Reset to initial state
    }

    function handleLapse() {
        if (timeRemaining < POMODORO_TIME) {
            const lapseLog = document.createElement('div');
            lapseLog.className = 'lapse-log';
            lapseLog.textContent = `Lapse at ${timerText.textContent}`;
            lapseLogs.appendChild(lapseLog);
        }
    }

    function handleClearLapseLogs() {
        lapseLogs.innerHTML = '';
    }

    startPauseBtn.addEventListener('click', handleStartPause);
    stopBtn.addEventListener('click', handleStop);
    resetBtn.addEventListener('click', handleReset);
    lapseBtn.addEventListener('click', handleLapse);
    clearLapseLogsBtn.addEventListener('click', handleClearLapseLogs);
});
