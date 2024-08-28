/******/ (() => { // webpackBootstrap
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7O0FBRWpDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixNQUFNO0FBQ04sdUJBQXVCO0FBQ3ZCLE1BQU07QUFDTix1QkFBdUI7QUFDdkIsTUFBTTtBQUNOLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3ZpZGVvLXNsZWVwLWNocm9tZS1leHRlbnNpb24vLi9zcmMvY29udGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhZGRCbGFja092ZXJsYXkoKSB7XG4gIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBvdmVybGF5LmlkID0gXCJibGFjay1vdmVybGF5XCI7XG4gIG92ZXJsYXkuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gIG92ZXJsYXkuc3R5bGUudG9wID0gXCIwXCI7XG4gIG92ZXJsYXkuc3R5bGUubGVmdCA9IFwiMFwiO1xuICBvdmVybGF5LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gIG92ZXJsYXkuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG4gIG92ZXJsYXkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJibGFja1wiO1xuICBvdmVybGF5LnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgb3ZlcmxheS5zdHlsZS56SW5kZXggPSBcIjk5OTlcIjsgLy8gTWFrZSBzdXJlIGl0IGlzIG9uIHRvcCBvZiBvdGhlciBlbGVtZW50c1xuXG4gIC8vIEFkZCBldmVudCBsaXN0ZW5lciB0byByZW1vdmUgdGhlIG92ZXJsYXkgd2hlbiBjbGlja2VkXG4gIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlbW92ZUJsYWNrT3ZlcmxheSk7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQmxhY2tPdmVybGF5KCkge1xuICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibGFjay1vdmVybGF5XCIpO1xuICBpZiAob3ZlcmxheSkge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQob3ZlcmxheSk7XG4gIH1cbn1cblxuLy8gVmFyaWFibGUgdG8gc3RvcmUgdGhlIGFjdGl2ZSB0aW1lciBJRFxubGV0IGFjdGl2ZVRpbWVyID0gbnVsbDtcblxuLy8gRnVuY3Rpb24gdG8gcGF1c2UgdGhlIHZpZGVvIGFmdGVyIGEgc3BlY2lmaWVkIGRlbGF5XG5mdW5jdGlvbiBwYXVzZVZpZGVvQWZ0ZXJEZWxheShkZWxheSkge1xuICBhY3RpdmVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGNvbnN0IHZpZGVvRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcbiAgICBpZiAodmlkZW9FbGVtZW50ICYmICF2aWRlb0VsZW1lbnQucGF1c2VkKSB7XG4gICAgICB2aWRlb0VsZW1lbnQucGF1c2UoKTtcbiAgICAgIGFkZEJsYWNrT3ZlcmxheSgpO1xuICAgIH1cbiAgfSwgZGVsYXkpO1xufVxuXG4vLyBMaXN0ZW4gZm9yIG1lc3NhZ2VzIGZyb20gcG9wdXAuanNcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgaWYgKG1lc3NhZ2Uuc3RhcnRQYXVzZVRpbWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBDbGVhciBhbnkgZXhpc3RpbmcgdGltZXJcbiAgICBjbGVhclRpbWVvdXQoYWN0aXZlVGltZXIpO1xuICAgIC8vIFN0YXJ0IGEgbmV3IHRpbWVyIHdpdGggdGhlIHNwZWNpZmllZCBkZWxheVxuICAgIHBhdXNlVmlkZW9BZnRlckRlbGF5KG1lc3NhZ2Uuc3RhcnRQYXVzZVRpbWVyKTtcbiAgfVxuXG4gIGlmIChtZXNzYWdlLnBhdXNlTm93KSB7XG4gICAgLy8gQ2xlYXIgdGhlIGN1cnJlbnQgdGltZXIgd2l0aG91dCBzdGFydGluZyBhIG5ldyBvbmVcbiAgICBjbGVhclRpbWVvdXQoYWN0aXZlVGltZXIpO1xuICAgIGFjdGl2ZVRpbWVyID0gbnVsbDtcbiAgfVxufSk7XG5cbi8vIENoZWNrIGlmIGEgcGF1c2UgdGltZXIgaXMgYWN0aXZlIG9uIHBhZ2UgbG9hZC9yZWxvYWRcbmNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiYWN0aXZlUGF1c2VcIiwgKGRhdGEpID0+IHtcbiAgaWYgKGRhdGEuYWN0aXZlUGF1c2UpIHtcbiAgICBsZXQgZGVsYXk7XG4gICAgaWYgKGRhdGEuYWN0aXZlUGF1c2UgPT09IFwicGF1c2UzMFwiKSB7XG4gICAgICBkZWxheSA9IDE4MDAwMDA7IC8vIDMwIG1pbnV0ZXNcbiAgICB9IGVsc2UgaWYgKGRhdGEuYWN0aXZlUGF1c2UgPT09IFwicGF1c2U0NVwiKSB7XG4gICAgICBkZWxheSA9IDI3MDAwMDA7IC8vIDQ1IG1pbnV0ZXNcbiAgICB9IGVsc2UgaWYgKGRhdGEuYWN0aXZlUGF1c2UgPT09IFwicGF1c2U2MFwiKSB7XG4gICAgICBkZWxheSA9IDM2MDAwMDA7IC8vIDYwIG1pbnV0ZXNcbiAgICB9IGVsc2UgaWYgKGRhdGEuYWN0aXZlUGF1c2UgPT09IFwicGF1c2U1XCIpIHtcbiAgICAgIGRlbGF5ID0gMzAwMDAwOyAvLyA1IG1pbnV0ZXNcbiAgICB9XG4gICAgaWYgKGRlbGF5KSB7XG4gICAgICBwYXVzZVZpZGVvQWZ0ZXJEZWxheShkZWxheSk7XG4gICAgfVxuICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==