/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
chrome.runtime.onStartup.addListener(() => {
  updateBadgeTextFromStorage();
});

chrome.runtime.onInstalled.addListener(() => {
  updateBadgeTextFromStorage();
});

function updateBadgeTextFromStorage() {
  chrome.storage.sync.get('activePause', (data) => {
      let badgeText = '';
      const activePause = data.activePause;

      if (activePause === 'pause30') badgeText = '30';
      else if (activePause === 'pause45') badgeText = '45';
      else if (activePause === 'pause60') badgeText = '60';
      else if (activePause === 'pause5') badgeText = '5';

      chrome.action.setBadgeText({ text: badgeText });
  });
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DLGlCQUFpQjtBQUNwRCxHQUFHO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aWRlby1zbGVlcC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2hyb21lLnJ1bnRpbWUub25TdGFydHVwLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgdXBkYXRlQmFkZ2VUZXh0RnJvbVN0b3JhZ2UoKTtcbn0pO1xuXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4gIHVwZGF0ZUJhZGdlVGV4dEZyb21TdG9yYWdlKCk7XG59KTtcblxuZnVuY3Rpb24gdXBkYXRlQmFkZ2VUZXh0RnJvbVN0b3JhZ2UoKSB7XG4gIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KCdhY3RpdmVQYXVzZScsIChkYXRhKSA9PiB7XG4gICAgICBsZXQgYmFkZ2VUZXh0ID0gJyc7XG4gICAgICBjb25zdCBhY3RpdmVQYXVzZSA9IGRhdGEuYWN0aXZlUGF1c2U7XG5cbiAgICAgIGlmIChhY3RpdmVQYXVzZSA9PT0gJ3BhdXNlMzAnKSBiYWRnZVRleHQgPSAnMzAnO1xuICAgICAgZWxzZSBpZiAoYWN0aXZlUGF1c2UgPT09ICdwYXVzZTQ1JykgYmFkZ2VUZXh0ID0gJzQ1JztcbiAgICAgIGVsc2UgaWYgKGFjdGl2ZVBhdXNlID09PSAncGF1c2U2MCcpIGJhZGdlVGV4dCA9ICc2MCc7XG4gICAgICBlbHNlIGlmIChhY3RpdmVQYXVzZSA9PT0gJ3BhdXNlNScpIGJhZGdlVGV4dCA9ICc1JztcblxuICAgICAgY2hyb21lLmFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiBiYWRnZVRleHQgfSk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9