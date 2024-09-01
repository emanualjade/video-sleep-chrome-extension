import { StoredConfig } from "./common"
import "./options.css"

// Function to update the displayed list of excluded hosts
function updateExcludedHostsList(hosts: string[]): void {
  const list = document.getElementById(
    "excluded-hosts-list",
  ) as HTMLUListElement
  list.innerHTML = "" // Clear the existing list

  hosts.forEach((host) => {
    const li = document.createElement("li")
    li.textContent = host

    // Create the "x" button to remove the host
    const removeButton = document.createElement("button")
    removeButton.textContent = "x"
    removeButton.style.marginLeft = "10px"
    removeButton.style.color = "red"
    removeButton.style.cursor = "pointer"

    // Add event listener to remove the host when the "x" button is clicked
    removeButton.addEventListener("click", () => {
      removeHost(host)
    })

    li.appendChild(removeButton)
    list.appendChild(li)
  })
}

// Function to remove a host from the excluded hosts list
function removeHost(host: string): void {
  chrome.storage.sync.get(null, (data: StoredConfig) => {
    const hosts = data.excludeHosts ?? []
    const updatedHosts = hosts.filter((h) => h !== host)

    // Save the updated configuration
    const updatedConfig: StoredConfig = { ...data, excludeHosts: updatedHosts }
    chrome.storage.sync.set(updatedConfig, () => {
      // Update the UI with the new list
      updateExcludedHostsList(updatedHosts)

      // Send the updated list to all tabs
      chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]) => {
        tabs.forEach((tab) => {
          if (tab.id !== undefined) {
            chrome.tabs
              .sendMessage(tab.id, { excludeHosts: updatedHosts })
              .catch((error) => {
                console.error("Could not send message to tab", tab.id, error)
              })
          }
        })
      })
    })
  })
}

// Load stored configuration, including excluded hosts
chrome.storage.sync.get(null, (data: StoredConfig) => {
  const hosts = data.excludeHosts ?? []
  updateExcludedHostsList(hosts)
})

// Handle form submission
document
  .getElementById("exclude-form")
  ?.addEventListener("submit", function (event: Event) {
    event.preventDefault()

    const input = document.getElementById("exclude_host") as HTMLInputElement
    const newHost: string = input.value.trim()

    if (newHost) {
      // Retrieve the current list of hosts
      chrome.storage.sync.get(null, (data: StoredConfig) => {
        const hosts = data.excludeHosts ?? []

        // Add the new host to the list if it's not already included
        if (!hosts.includes(newHost)) {
          hosts.push(newHost)
        }

        // Save the updated configuration with excluded hosts
        const updatedConfig: StoredConfig = { ...data, excludeHosts: hosts }
        chrome.storage.sync.set(updatedConfig, () => {
          // Update the UI with the new list
          updateExcludedHostsList(hosts)

          // Clear the input field
          input.value = ""

          // Send the updated list to all tabs
          chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]) => {
            tabs.forEach((tab) => {
              if (tab.id !== undefined) {
                chrome.tabs
                  .sendMessage(tab.id, { excludeHosts: hosts })
                  .catch((error) => {
                    console.error(
                      "Could not send message to tab",
                      tab.id,
                      error,
                    )
                  })
              }
            })
          })
        })
      })
    }
  })
