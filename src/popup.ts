import { buttonsType, Message, StoredConfig } from "./common"

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

/// Define the buttons object
const buttons = {
  pause5: pause5Button,
  pause30: pause30Button,
  pause45: pause45Button,
  pause60: pause60Button,
} as const
// type buttonsType = keyof typeof buttons
// Function to update button text and state
function updateButtonState(
  activeButton: buttonsType | undefined,
  makeActive: boolean,
): void {
  // Remove the active class from all buttons and reset text content
  for (const key in buttons) {
    const button = buttons[key as buttonsType]
    if (button) {
      button.classList.remove("active")
      button.textContent = `Pause in ${key.slice(5)}`
    }
  }
  if (!activeButton) return
  // Update the active button
  const activeBtn = buttons[activeButton]
  if (activeBtn) {
    activeBtn.textContent = makeActive
      ? `Disable Pause in ${activeButton.slice(5)}`
      : `Pause in ${activeButton.slice(5)}`
    activeBtn.classList.toggle("active", makeActive)
  }
}

// Function to update the badge text
function updateBadgeText(activeButton: buttonsType | undefined): void {
  let badgeText = ""
  if (activeButton === "pause30") badgeText = "30"
  else if (activeButton === "pause45") badgeText = "45"
  else if (activeButton === "pause60") badgeText = "60"
  else if (activeButton === "pause5") badgeText = "5"

  chrome.action.setBadgeText({ text: badgeText }).catch(console.error)
}

// Load the current state from chrome storage
chrome.storage.sync.get("activePause", (data: StoredConfig) => {
  updateButtonState(data.activePause, true)
  updateBadgeText(data.activePause)
})

function handleButtonClick(buttonId: buttonsType, delay: number): void {
  chrome.storage.sync.get("activePause", (data: Record<string, string>) => {
    if (data.activePause === buttonId) {
      // Disable the active pause
      chrome.storage.sync.remove("activePause", () => {
        updateButtonState(buttonId, false)
        chrome.action.setBadgeText({ text: "" }).catch(console.error)
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0].id !== undefined) {
            const message: Message = { clearPausing: true }
            chrome.tabs.sendMessage(tabs[0].id, message).catch(console.error)
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
            const message: Message = { startPauseTimer: delay }
            chrome.tabs.sendMessage(tabs[0].id, message).catch(console.error)
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

// Options page
const optionsElement = document.querySelector("#go-to-options")
if (!optionsElement) {
  console.error("Could not find options element")
} else {
  optionsElement.addEventListener("click", function () {
    // This code is based on Chrome for Developers documentation
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage().catch((error: unknown) => {
        console.error("Could not open options page", error)
      })
    } else {
      window.open(chrome.runtime.getURL("options.html"))
    }
  })
}
