let timer;
let isRunning = false;
let remainingTime = 25 * 60; // 25 minutes in seconds
const totalTime = 25 * 60; // Total time for session in seconds
let isFocusSession = true;

const statusText = document.getElementById("status-text");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const progressCircle = document.querySelector(".circle-progress");

function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  minutesDisplay.textContent = minutes.toString().padStart(2, "0");
  secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

function updateProgress() {
  const progress = ((totalTime - remainingTime) / totalTime) * 753.6; // 753.6 is the circle circumference
  progressCircle.style.strokeDashoffset = 753.6 - progress;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  statusText.textContent = "Focus";
  timer = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
      updateProgress();
    } else {
      clearInterval(timer);
      isRunning = false;
      if (isFocusSession) {
        statusText.textContent = "Break";
        remainingTime =
          parseInt(
            document.getElementById("break-length-display").textContent
          ) * 60;
      } else {
        statusText.textContent = "Focus";
        remainingTime =
          parseInt(
            document.getElementById("session-length-display").textContent
          ) * 60;
      }
      isFocusSession = !isFocusSession;
      updateDisplay();
      updateProgress();
      startTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  statusText.textContent = "Paused";
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isFocusSession = true;
  statusText.textContent = "Pomodoro";
  remainingTime =
    parseInt(document.getElementById("session-length-display").textContent) *
    60;
  updateDisplay();
  progressCircle.style.strokeDashoffset = 753.6; // Reset the progress circle
}

// Event Listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

// Initialize Display
updateDisplay();
