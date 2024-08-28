document.addEventListener("DOMContentLoaded", () => {
  const pause5Button = document.getElementById("pause5");
  const pause30Button = document.getElementById("pause30");
  const pause45Button = document.getElementById("pause45");
  const pause60Button = document.getElementById("pause60");

  // Function to update button text and state
  function updateButtonState(activeButton, state) {
    pause5Button.textContent =
      state && activeButton === "pause5" ? "Disable Pause in 5" : "Pause in 5";
    pause30Button.textContent =
      state && activeButton === "pause30"
        ? "Disable Pause in 30"
        : "Pause in 30";
    pause45Button.textContent =
      state && activeButton === "pause45"
        ? "Disable Pause in 45"
        : "Pause in 45";
    pause60Button.textContent =
      state && activeButton === "pause60"
        ? "Disable Pause in 60"
        : "Pause in 60";

    // add class to show active button for active button and remove for others
    if (state && activeButton === "pause30") {
      pause30Button.classList.add("active");
      pause45Button.classList.remove("active");
      pause60Button.classList.remove("active");
      pause5Button.classList.remove("active");
    } else if (state && activeButton === "pause45") {
      pause30Button.classList.remove("active");
      pause45Button.classList.add("active");
      pause60Button.classList.remove("active");
      pause5Button.classList.remove("active");
    } else if (state && activeButton === "pause60") {
      pause30Button.classList.remove("active");
      pause45Button.classList.remove("active");
      pause60Button.classList.add("active");
      pause5Button.classList.remove("active");
    } else if (state && activeButton === "pause5") {
      pause30Button.classList.remove("active");
      pause45Button.classList.remove("active");
      pause60Button.classList.remove("active");
      pause5Button.classList.add("active");
    } else {
      pause5Button.classList.remove("active");
      pause45Button.classList.remove("active");
      pause30Button.classList.remove("active");
      pause60Button.classList.remove("active");
    }
  }

  // Function to update the badge text
  function updateBadgeText(activeButton) {
    let badgeText = "";
    if (activeButton === "pause30") badgeText = "30";
    else if (activeButton === "pause45") badgeText = "45";
    else if (activeButton === "pause60") badgeText = "60";
    else if (activeButton === "pause5") badgeText = "5";

    chrome.action.setBadgeText({ text: badgeText });
  }

  // Load the current state from chrome storage
  chrome.storage.sync.get("activePause", (data) => {
    updateButtonState(data.activePause, true);
    updateBadgeText(data.activePause);
  });

  function handleButtonClick(buttonId, delay) {
    chrome.storage.sync.get("activePause", (data) => {
      if (data.activePause === buttonId) {
        // Disable the active pause
        chrome.storage.sync.remove("activePause", () => {
          updateButtonState(buttonId, false);
          chrome.action.setBadgeText({ text: "" });
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { pauseNow: true });
          });
        });
      } else {
        // Set new active pause
        chrome.storage.sync.set({ activePause: buttonId }, () => {
          updateButtonState(buttonId, true);
          updateBadgeText(buttonId);
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { startPauseTimer: delay });
          });
        });
      }
    });
  }

  // Event listeners for each button
  pause30Button.addEventListener("click", () =>
    handleButtonClick("pause30", 1800000)
  ); // 30 minutes
  pause45Button.addEventListener("click", () =>
    handleButtonClick("pause45", 2700000)
  ); // 45 minutes
  pause60Button.addEventListener("click", () =>
    handleButtonClick("pause60", 3600000)
  ); // 60 minutes
  pause5Button.addEventListener("click", () =>
    handleButtonClick("pause5", 300000)
  ); // 5 minutes
});
