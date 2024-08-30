const pause5Button = document.getElementById(
  "pause5",
) as HTMLButtonElement | null
const pause30Button = document.getElementById(
  "pause30",
) as HTMLButtonElement | null
const pause45Button = document.getElementById(
  "pause45",
) as HTMLButtonElement | null
const pause60Button = document.getElementById(
  "pause60",
) as HTMLButtonElement | null

// Function to update button text and state
function updateButtonState(activeButton: string, state: boolean): void {
  if (pause5Button) {
    pause5Button.textContent =
      state && activeButton === "pause5" ? "Disable Pause in 5" : "Pause in 5"
    pause5Button.classList.toggle("active", state && activeButton === "pause5")
  }
  if (pause30Button) {
    pause30Button.textContent =
      state && activeButton === "pause30"
        ? "Disable Pause in 30"
        : "Pause in 30"
    pause30Button.classList.toggle(
      "active",
      state && activeButton === "pause30",
    )
  }
  if (pause45Button) {
    pause45Button.textContent =
      state && activeButton === "pause45"
        ? "Disable Pause in 45"
        : "Pause in 45"
    pause45Button.classList.toggle(
      "active",
      state && activeButton === "pause45",
    )
  }
  if (pause60Button) {
    pause60Button.textContent =
      state && activeButton === "pause60"
        ? "Disable Pause in 60"
        : "Pause in 60"
    pause60Button.classList.toggle(
      "active",
      state && activeButton === "pause60",
    )
  }
}

// Function to update the badge text
function updateBadgeText(activeButton: string): void {
  let badgeText = ""
  if (activeButton === "pause30") badgeText = "30"
  else if (activeButton === "pause45") badgeText = "45"
  else if (activeButton === "pause60") badgeText = "60"
  else if (activeButton === "pause5") badgeText = "5"

  chrome.action.setBadgeText({ text: badgeText }).catch(console.error)
}

// Load the current state from chrome storage
chrome.storage.sync.get("activePause", (data: Record<string, string>) => {
  console.log("open")
  console.log({data})
  updateButtonState(data.activePause, true)
  updateBadgeText(data.activePause)
})

function handleButtonClick(buttonId: string, delay: number): void {
  chrome.storage.sync.get("activePause", (data: Record<string, string>) => {
    if (data.activePause === buttonId) {
      // Disable the active pause
      chrome.storage.sync.remove("activePause", () => {
        updateButtonState(buttonId, false)
        chrome.action.setBadgeText({ text: "" }).catch(console.error)
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0].id !== undefined) {
            chrome.tabs
              .sendMessage(tabs[0].id, { clearPausing: true })
              .catch(console.error)
          }
        })
      })
    } else {
      // Set new active pause
      chrome.storage.sync.set({ activePause: buttonId }, () => {
        updateButtonState(buttonId, true)
        updateBadgeText(buttonId)
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0].id !== undefined) {
            chrome.tabs
              .sendMessage(tabs[0].id, { startPauseTimer: delay })
              .catch(console.error)
          }
        })
      })
    }
  })
}

// Event listeners for each button
pause30Button?.addEventListener("click", () =>
  handleButtonClick("pause30", 1800000),
) // 30 minutes
pause45Button?.addEventListener("click", () =>
  handleButtonClick("pause45", 2700000),
) // 45 minutes
pause60Button?.addEventListener("click", () =>
  handleButtonClick("pause60", 3600000),
) // 60 minutes
pause5Button?.addEventListener("click", () =>
  handleButtonClick("pause5", 300000),
) // 5 minutes
