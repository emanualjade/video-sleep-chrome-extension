function addBlackOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "black-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "black";
  overlay.style.opacity = "1";
  overlay.style.zIndex = "9999"; // Make sure it is on top of other elements

  // Add event listener to remove the overlay when clicked
  overlay.addEventListener("click", removeBlackOverlay);

  document.body.appendChild(overlay);
}

function removeBlackOverlay() {
  const overlay = document.getElementById("black-overlay");
  if (overlay) {
    document.body.removeChild(overlay);
  }
}

// Variable to store the active timer ID
let activeTimer = null;

// Function to pause the video after a specified delay
function pauseVideoAfterDelay(delay) {
  activeTimer = setTimeout(() => {
    const videoElement = document.querySelector("video");
    if (videoElement && !videoElement.paused) {
      videoElement.pause();
      addBlackOverlay();
    }
  }, delay);
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.startPauseTimer !== undefined) {
    // Clear any existing timer
    clearTimeout(activeTimer);
    // Start a new timer with the specified delay
    pauseVideoAfterDelay(message.startPauseTimer);
  }

  if (message.pauseNow) {
    // Clear the current timer without starting a new one
    clearTimeout(activeTimer);
    activeTimer = null;
  }
});

// Check if a pause timer is active on page load/reload
chrome.storage.sync.get("activePause", (data) => {
  if (data.activePause) {
    let delay;
    if (data.activePause === "pause30") {
      delay = 1800000; // 30 minutes
    } else if (data.activePause === "pause45") {
      delay = 2700000; // 45 minutes
    } else if (data.activePause === "pause60") {
      delay = 3600000; // 60 minutes
    } else if (data.activePause === "pause5") {
      delay = 300000; // 5 minutes
    }
    if (delay) {
      pauseVideoAfterDelay(delay);
    }
  }
});
