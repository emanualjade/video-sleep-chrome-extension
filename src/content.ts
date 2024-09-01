import { Message, StoredConfig } from "./common"

function normalizeHost(host: string) {
  // Remove protocol (http, https, etc.) and "www" if it exists
  return host.replace(/^(https?:\/\/)?(www\.)?/, "").toLowerCase()
}

function isHostExcluded(hostname: string, excludedHosts: string[]): boolean {
  // Normalize the current hostname
  const normalizedHostname = normalizeHost(hostname)
  // Normalize and compare each excluded host
  return excludedHosts.some((excludedHost) => {
    const normalizedExcludedHost = normalizeHost(excludedHost)
    // Check if the hostname ends with the excluded host
    return normalizedHostname.endsWith(normalizedExcludedHost)
  })
}

function addBlackOverlay(): void {
  const overlay = document.createElement("div")
  overlay.id = "black-overlay"
  overlay.style.position = "fixed"
  overlay.style.top = "0"
  overlay.style.left = "0"
  overlay.style.width = "100%"
  overlay.style.height = "100%"
  overlay.style.backgroundColor = "black"
  overlay.style.opacity = "1"
  overlay.style.zIndex = "9999" // Ensure it is on top of other elements

  overlay.addEventListener("click", removeBlackOverlay)

  document.body.appendChild(overlay)
}

function removeBlackOverlay(): void {
  const overlay = document.getElementById("black-overlay")
  if (overlay) {
    document.body.removeChild(overlay)
  }
}

// Variable to store the active timer ID
let activeTimer: number | undefined
let excludeHosts: string[] = []

// Function to pause the video after a specified delay
function pauseVideoAfterDelay(delay: number): void {
  clearExistingTimer()
  activeTimer = window.setTimeout(() => {
    const videoElement = document.querySelector<HTMLVideoElement>("video")
    if (videoElement && !videoElement.paused) {
      videoElement.pause()
      addBlackOverlay()
    }
  }, delay)
}

// Clears the existing timer if there is one
function clearExistingTimer(): void {
  if (activeTimer !== undefined) {
    clearTimeout(activeTimer)
    activeTimer = undefined
  }
}

// Function to get the delay based on the activePause key
function getDelayFromKey(key: string | undefined): number | undefined {
  switch (key) {
    case "pause30":
      return 1800000 // 30 minutes
    case "pause45":
      return 2700000 // 45 minutes
    case "pause60":
      return 3600000 // 60 minutes
    case "pause5":
      return 300000 // 5 minutes
    default:
      return undefined
  }
}

// Listen for video play events to reset the timer
function addVideoEventListeners(): void {
  const videoElement = document.querySelector<HTMLVideoElement>("video")
  if (videoElement) {
    videoElement.addEventListener("play", () => {
      chrome.storage.sync.get(null, (data: StoredConfig) => {
        const delay = getDelayFromKey(data.activePause)
        if (delay !== undefined) {
          pauseVideoAfterDelay(delay)
        }
      })
    })
  }
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message: Message) => {
  if (message.excludeHosts !== undefined) {
    excludeHosts = message.excludeHosts
    return
  }

  if (isHostExcluded(window.location.hostname, excludeHosts)) {
    console.log("Host is excluded from pausing")
    clearExistingTimer()
    return
  }

  if (message.startPauseTimer !== undefined) {
    // Clear any existing timer and start a new one
    clearExistingTimer()
    pauseVideoAfterDelay(message.startPauseTimer)
  }

  if (message.clearPausing) {
    clearExistingTimer()
  }
})

// Check if a pause timer is active on page load/reload
chrome.storage.sync.get(null, (data: StoredConfig) => {
  const delay = getDelayFromKey(data.activePause)
  excludeHosts = data.excludeHosts ?? []

  if (isHostExcluded(window.location.hostname, excludeHosts)) {
    console.log("Host is excluded from pausing")
    return
  }

  if (delay !== undefined) {
    pauseVideoAfterDelay(delay)
  }
  // Add event listeners to manage play/pause events
  addVideoEventListeners()
})
