chrome.runtime.onStartup.addListener(() => {
  updateBadgeTextFromStorage()
})

chrome.runtime.onInstalled.addListener(() => {
  updateBadgeTextFromStorage()
})

function updateBadgeTextFromStorage() {
  chrome.storage.sync.get("activePause", (data: { activePause?: string }) => {
    let badgeText = ""
    const activePause = data.activePause

    if (activePause === "pause30") badgeText = "30"
    else if (activePause === "pause45") badgeText = "45"
    else if (activePause === "pause60") badgeText = "60"
    else if (activePause === "pause5") badgeText = "5"
    chrome.action.setBadgeText({ text: badgeText }).catch(console.error)
  })
}
