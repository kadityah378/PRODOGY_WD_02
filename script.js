let timer;
let isRunning = false;
let startTime;
let pausedTime = 0;
let laps = [];

function startStopwatch() {
    if (!isRunning) {
      if (pausedTime === 0) {
        startTime = new Date().getTime();
      } else {
        // Adjust startTime by subtracting the paused time
        startTime = new Date().getTime() - pausedTime;
        pausedTime = 0;
      }
      
      timer = setInterval(updateDisplay, 10); // Update every 10 milliseconds
      isRunning = true;
      document.querySelector('button:nth-of-type(1)').innerText = 'Pause';
    } else {
      clearInterval(timer);
      isRunning = false;
      pausedTime = new Date().getTime() - startTime; // Store the paused time
      document.querySelector('button:nth-of-type(1)').innerText = 'Resume';
    }
  }
  
  function pauseStopwatch() {
    if (isRunning) {
      clearInterval(timer);
      isRunning = false;
      pausedTime = new Date().getTime() - startTime; // Store the paused time
      document.querySelector('button:nth-of-type(1)').innerText = 'Resume';
    }
  }
  
  function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    startTime = 0; // Reset startTime to 0
    pausedTime = 0; // Reset pausedTime to 0
    document.getElementById('display').innerText = '00:00:00.000';
    document.querySelector('button:nth-of-type(1)').innerText = 'Start';
    laps = [];
    updateLaps();
  }

function updateDisplay() {
  const currentTime = new Date().getTime();
  const elapsedTime = new Date(currentTime - startTime);
  const hours = elapsedTime.getUTCHours().toString().padStart(2, '0');
  const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
  const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = elapsedTime.getUTCMilliseconds().toString().padStart(3, '0');
  document.getElementById('display').innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function lap() {
    if (isRunning) {
      const currentTime = new Date().getTime();
      const elapsedTime = new Date(currentTime - startTime);
      const lapTime = `${elapsedTime.getUTCHours().toString().padStart(2, '0')}:${elapsedTime.getUTCMinutes().toString().padStart(2, '0')}:${elapsedTime.getUTCSeconds().toString().padStart(2, '0')}.${elapsedTime.getUTCMilliseconds().toString().padStart(3, '0')}`;
      laps.push(lapTime);
      updateLaps();
      startTime = currentTime; // Update startTime for the next lap
    }
  }
  

function updateLaps() {
  const lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(lapItem);
  });
}
