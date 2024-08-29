/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!************************!*\
  !*** ./src/content.ts ***!
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
let activeTimer = undefined;
// Function to pause the video after a specified delay
function pauseVideoAfterDelay(delay) {
    activeTimer = window.setTimeout(() => {
        const videoElement = document.querySelector("video");
        if (videoElement && !videoElement.paused) {
            videoElement.pause();
            addBlackOverlay();
        }
    }, delay);
}
// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message) => {
    if (message.startPauseTimer !== undefined) {
        // Clear any existing timer
        clearTimeout(activeTimer);
        // Start a new timer with the specified delay
        pauseVideoAfterDelay(message.startPauseTimer);
    }
    if (message.clearPausing) {
        // Clear the current timer without starting a new one
        if (activeTimer !== undefined) {
            clearTimeout(activeTimer);
        }
        activeTimer = undefined;
    }
});
// Check if a pause timer is active on page load/reload
chrome.storage.sync.get("activePause", (data) => {
    if (data.activePause) {
        let delay;
        if (data.activePause === "pause30") {
            delay = 1800000; // 30 minutes
        }
        else if (data.activePause === "pause45") {
            delay = 2700000; // 45 minutes
        }
        else if (data.activePause === "pause60") {
            delay = 3600000; // 60 minutes
        }
        else if (data.activePause === "pause5") {
            delay = 300000; // 5 minutes
        }
        if (delay) {
            pauseVideoAfterDelay(delay);
        }
    }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDMUMsS0FBSyxHQUFHLE9BQU8sRUFBQyxhQUFhO1FBQy9CLENBQUM7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDekMsS0FBSyxHQUFHLE1BQU0sRUFBQyxZQUFZO1FBQzdCLENBQUM7UUFDRCxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1Ysb0JBQW9CLENBQUMsS0FBSyxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmlkZW8tc2xlZXAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy9jb250ZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFkZEJsYWNrT3ZlcmxheSgpIHtcbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgb3ZlcmxheS5pZCA9IFwiYmxhY2stb3ZlcmxheVwiXG4gIG92ZXJsYXkuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCJcbiAgb3ZlcmxheS5zdHlsZS50b3AgPSBcIjBcIlxuICBvdmVybGF5LnN0eWxlLmxlZnQgPSBcIjBcIlxuICBvdmVybGF5LnN0eWxlLndpZHRoID0gXCIxMDAlXCJcbiAgb3ZlcmxheS5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIlxuICBvdmVybGF5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiYmxhY2tcIlxuICBvdmVybGF5LnN0eWxlLm9wYWNpdHkgPSBcIjFcIlxuICBvdmVybGF5LnN0eWxlLnpJbmRleCA9IFwiOTk5OVwiIC8vIE1ha2Ugc3VyZSBpdCBpcyBvbiB0b3Agb2Ygb3RoZXIgZWxlbWVudHNcblxuICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gcmVtb3ZlIHRoZSBvdmVybGF5IHdoZW4gY2xpY2tlZFxuICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW1vdmVCbGFja092ZXJsYXkpXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KVxufVxuXG5mdW5jdGlvbiByZW1vdmVCbGFja092ZXJsYXkoKSB7XG4gIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJsYWNrLW92ZXJsYXlcIilcbiAgaWYgKG92ZXJsYXkpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG92ZXJsYXkpXG4gIH1cbn1cblxuLy8gVmFyaWFibGUgdG8gc3RvcmUgdGhlIGFjdGl2ZSB0aW1lciBJRFxubGV0IGFjdGl2ZVRpbWVyOiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcblxuLy8gRnVuY3Rpb24gdG8gcGF1c2UgdGhlIHZpZGVvIGFmdGVyIGEgc3BlY2lmaWVkIGRlbGF5XG5mdW5jdGlvbiBwYXVzZVZpZGVvQWZ0ZXJEZWxheShkZWxheTogbnVtYmVyKSB7XG4gIGFjdGl2ZVRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGNvbnN0IHZpZGVvRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKVxuICAgIGlmICh2aWRlb0VsZW1lbnQgJiYgIXZpZGVvRWxlbWVudC5wYXVzZWQpIHtcbiAgICAgIHZpZGVvRWxlbWVudC5wYXVzZSgpXG4gICAgICBhZGRCbGFja092ZXJsYXkoKVxuICAgIH1cbiAgfSwgZGVsYXkpXG59XG5cbmludGVyZmFjZSBNZXNzYWdlIHtcbiAgc3RhcnRQYXVzZVRpbWVyPzogbnVtYmVyXG4gIGNsZWFyUGF1c2luZz86IGJvb2xlYW5cbn1cbi8vIExpc3RlbiBmb3IgbWVzc2FnZXMgZnJvbSBwb3B1cC5qc1xuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gIGlmIChtZXNzYWdlLnN0YXJ0UGF1c2VUaW1lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gQ2xlYXIgYW55IGV4aXN0aW5nIHRpbWVyXG4gICAgY2xlYXJUaW1lb3V0KGFjdGl2ZVRpbWVyKVxuICAgIC8vIFN0YXJ0IGEgbmV3IHRpbWVyIHdpdGggdGhlIHNwZWNpZmllZCBkZWxheVxuICAgIHBhdXNlVmlkZW9BZnRlckRlbGF5KG1lc3NhZ2Uuc3RhcnRQYXVzZVRpbWVyKVxuICB9XG5cbiAgaWYgKG1lc3NhZ2UuY2xlYXJQYXVzaW5nKSB7XG4gICAgLy8gQ2xlYXIgdGhlIGN1cnJlbnQgdGltZXIgd2l0aG91dCBzdGFydGluZyBhIG5ldyBvbmVcbiAgICBpZiAoYWN0aXZlVGltZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGFjdGl2ZVRpbWVyKVxuICAgIH1cbiAgICBhY3RpdmVUaW1lciA9IHVuZGVmaW5lZFxuICB9XG59KVxuXG4vLyBDaGVjayBpZiBhIHBhdXNlIHRpbWVyIGlzIGFjdGl2ZSBvbiBwYWdlIGxvYWQvcmVsb2FkXG5jaHJvbWUuc3RvcmFnZS5zeW5jLmdldChcImFjdGl2ZVBhdXNlXCIsIChkYXRhKSA9PiB7XG4gIGlmIChkYXRhLmFjdGl2ZVBhdXNlKSB7XG4gICAgbGV0IGRlbGF5XG4gICAgaWYgKGRhdGEuYWN0aXZlUGF1c2UgPT09IFwicGF1c2UzMFwiKSB7XG4gICAgICBkZWxheSA9IDE4MDAwMDAgLy8gMzAgbWludXRlc1xuICAgIH0gZWxzZSBpZiAoZGF0YS5hY3RpdmVQYXVzZSA9PT0gXCJwYXVzZTQ1XCIpIHtcbiAgICAgIGRlbGF5ID0gMjcwMDAwMCAvLyA0NSBtaW51dGVzXG4gICAgfSBlbHNlIGlmIChkYXRhLmFjdGl2ZVBhdXNlID09PSBcInBhdXNlNjBcIikge1xuICAgICAgZGVsYXkgPSAzNjAwMDAwIC8vIDYwIG1pbnV0ZXNcbiAgICB9IGVsc2UgaWYgKGRhdGEuYWN0aXZlUGF1c2UgPT09IFwicGF1c2U1XCIpIHtcbiAgICAgIGRlbGF5ID0gMzAwMDAwIC8vIDUgbWludXRlc1xuICAgIH1cbiAgICBpZiAoZGVsYXkpIHtcbiAgICAgIHBhdXNlVmlkZW9BZnRlckRlbGF5KGRlbGF5KVxuICAgIH1cbiAgfVxufSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==