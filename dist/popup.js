/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsaUJBQWlCO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsVUFBVTtBQUNqRCw4QkFBOEIsbUNBQW1DO0FBQ2pFLGtEQUFrRCxnQkFBZ0I7QUFDbEUsV0FBVztBQUNYLFNBQVM7QUFDVCxRQUFRO0FBQ1I7QUFDQSxrQ0FBa0MsdUJBQXVCO0FBQ3pEO0FBQ0E7QUFDQSw4QkFBOEIsbUNBQW1DO0FBQ2pFLGtEQUFrRCx3QkFBd0I7QUFDMUUsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3ZpZGVvLXNsZWVwLWNocm9tZS1leHRlbnNpb24vLi9zcmMvcG9wdXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zdCBwYXVzZTVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhdXNlNVwiKTtcbiAgY29uc3QgcGF1c2UzMEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGF1c2UzMFwiKTtcbiAgY29uc3QgcGF1c2U0NUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGF1c2U0NVwiKTtcbiAgY29uc3QgcGF1c2U2MEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGF1c2U2MFwiKTtcblxuICAvLyBGdW5jdGlvbiB0byB1cGRhdGUgYnV0dG9uIHRleHQgYW5kIHN0YXRlXG4gIGZ1bmN0aW9uIHVwZGF0ZUJ1dHRvblN0YXRlKGFjdGl2ZUJ1dHRvbiwgc3RhdGUpIHtcbiAgICBwYXVzZTVCdXR0b24udGV4dENvbnRlbnQgPVxuICAgICAgc3RhdGUgJiYgYWN0aXZlQnV0dG9uID09PSBcInBhdXNlNVwiID8gXCJEaXNhYmxlIFBhdXNlIGluIDVcIiA6IFwiUGF1c2UgaW4gNVwiO1xuICAgIHBhdXNlMzBCdXR0b24udGV4dENvbnRlbnQgPVxuICAgICAgc3RhdGUgJiYgYWN0aXZlQnV0dG9uID09PSBcInBhdXNlMzBcIlxuICAgICAgICA/IFwiRGlzYWJsZSBQYXVzZSBpbiAzMFwiXG4gICAgICAgIDogXCJQYXVzZSBpbiAzMFwiO1xuICAgIHBhdXNlNDVCdXR0b24udGV4dENvbnRlbnQgPVxuICAgICAgc3RhdGUgJiYgYWN0aXZlQnV0dG9uID09PSBcInBhdXNlNDVcIlxuICAgICAgICA/IFwiRGlzYWJsZSBQYXVzZSBpbiA0NVwiXG4gICAgICAgIDogXCJQYXVzZSBpbiA0NVwiO1xuICAgIHBhdXNlNjBCdXR0b24udGV4dENvbnRlbnQgPVxuICAgICAgc3RhdGUgJiYgYWN0aXZlQnV0dG9uID09PSBcInBhdXNlNjBcIlxuICAgICAgICA/IFwiRGlzYWJsZSBQYXVzZSBpbiA2MFwiXG4gICAgICAgIDogXCJQYXVzZSBpbiA2MFwiO1xuXG4gICAgLy8gYWRkIGNsYXNzIHRvIHNob3cgYWN0aXZlIGJ1dHRvbiBmb3IgYWN0aXZlIGJ1dHRvbiBhbmQgcmVtb3ZlIGZvciBvdGhlcnNcbiAgICBpZiAoc3RhdGUgJiYgYWN0aXZlQnV0dG9uID09PSBcInBhdXNlMzBcIikge1xuICAgICAgcGF1c2UzMEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgcGF1c2U0NUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgcGF1c2U2MEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgcGF1c2U1QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmJiBhY3RpdmVCdXR0b24gPT09IFwicGF1c2U0NVwiKSB7XG4gICAgICBwYXVzZTMwQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICBwYXVzZTQ1QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICBwYXVzZTYwQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICBwYXVzZTVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYmIGFjdGl2ZUJ1dHRvbiA9PT0gXCJwYXVzZTYwXCIpIHtcbiAgICAgIHBhdXNlMzBCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgIHBhdXNlNDVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgIHBhdXNlNjBCdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgIHBhdXNlNUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiYgYWN0aXZlQnV0dG9uID09PSBcInBhdXNlNVwiKSB7XG4gICAgICBwYXVzZTMwQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICBwYXVzZTQ1QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICBwYXVzZTYwQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICBwYXVzZTVCdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF1c2U1QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICBwYXVzZTQ1QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICBwYXVzZTMwQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICBwYXVzZTYwQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBiYWRnZSB0ZXh0XG4gIGZ1bmN0aW9uIHVwZGF0ZUJhZGdlVGV4dChhY3RpdmVCdXR0b24pIHtcbiAgICBsZXQgYmFkZ2VUZXh0ID0gXCJcIjtcbiAgICBpZiAoYWN0aXZlQnV0dG9uID09PSBcInBhdXNlMzBcIikgYmFkZ2VUZXh0ID0gXCIzMFwiO1xuICAgIGVsc2UgaWYgKGFjdGl2ZUJ1dHRvbiA9PT0gXCJwYXVzZTQ1XCIpIGJhZGdlVGV4dCA9IFwiNDVcIjtcbiAgICBlbHNlIGlmIChhY3RpdmVCdXR0b24gPT09IFwicGF1c2U2MFwiKSBiYWRnZVRleHQgPSBcIjYwXCI7XG4gICAgZWxzZSBpZiAoYWN0aXZlQnV0dG9uID09PSBcInBhdXNlNVwiKSBiYWRnZVRleHQgPSBcIjVcIjtcblxuICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogYmFkZ2VUZXh0IH0pO1xuICB9XG5cbiAgLy8gTG9hZCB0aGUgY3VycmVudCBzdGF0ZSBmcm9tIGNocm9tZSBzdG9yYWdlXG4gIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiYWN0aXZlUGF1c2VcIiwgKGRhdGEpID0+IHtcbiAgICB1cGRhdGVCdXR0b25TdGF0ZShkYXRhLmFjdGl2ZVBhdXNlLCB0cnVlKTtcbiAgICB1cGRhdGVCYWRnZVRleHQoZGF0YS5hY3RpdmVQYXVzZSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZUJ1dHRvbkNsaWNrKGJ1dHRvbklkLCBkZWxheSkge1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwiYWN0aXZlUGF1c2VcIiwgKGRhdGEpID0+IHtcbiAgICAgIGlmIChkYXRhLmFjdGl2ZVBhdXNlID09PSBidXR0b25JZCkge1xuICAgICAgICAvLyBEaXNhYmxlIHRoZSBhY3RpdmUgcGF1c2VcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5yZW1vdmUoXCJhY3RpdmVQYXVzZVwiLCAoKSA9PiB7XG4gICAgICAgICAgdXBkYXRlQnV0dG9uU3RhdGUoYnV0dG9uSWQsIGZhbHNlKTtcbiAgICAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IFwiXCIgfSk7XG4gICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgKHRhYnMpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHsgcGF1c2VOb3c6IHRydWUgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2V0IG5ldyBhY3RpdmUgcGF1c2VcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyBhY3RpdmVQYXVzZTogYnV0dG9uSWQgfSwgKCkgPT4ge1xuICAgICAgICAgIHVwZGF0ZUJ1dHRvblN0YXRlKGJ1dHRvbklkLCB0cnVlKTtcbiAgICAgICAgICB1cGRhdGVCYWRnZVRleHQoYnV0dG9uSWQpO1xuICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCB7IHN0YXJ0UGF1c2VUaW1lcjogZGVsYXkgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gRXZlbnQgbGlzdGVuZXJzIGZvciBlYWNoIGJ1dHRvblxuICBwYXVzZTMwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgIGhhbmRsZUJ1dHRvbkNsaWNrKFwicGF1c2UzMFwiLCAxODAwMDAwKVxuICApOyAvLyAzMCBtaW51dGVzXG4gIHBhdXNlNDVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgaGFuZGxlQnV0dG9uQ2xpY2soXCJwYXVzZTQ1XCIsIDI3MDAwMDApXG4gICk7IC8vIDQ1IG1pbnV0ZXNcbiAgcGF1c2U2MEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cbiAgICBoYW5kbGVCdXR0b25DbGljayhcInBhdXNlNjBcIiwgMzYwMDAwMClcbiAgKTsgLy8gNjAgbWludXRlc1xuICBwYXVzZTVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgaGFuZGxlQnV0dG9uQ2xpY2soXCJwYXVzZTVcIiwgMzAwMDAwKVxuICApOyAvLyA1IG1pbnV0ZXNcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9