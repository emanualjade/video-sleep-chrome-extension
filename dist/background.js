/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/

chrome.runtime.onStartup.addListener(() => {
    updateBadgeTextFromStorage();
});
chrome.runtime.onInstalled.addListener(() => {
    updateBadgeTextFromStorage();
});
function updateBadgeTextFromStorage() {
    chrome.storage.sync.get("activePause", (data) => {
        let badgeText = "";
        const activePause = data.activePause;
        if (activePause === "pause30")
            badgeText = "30";
        else if (activePause === "pause45")
            badgeText = "45";
        else if (activePause === "pause60")
            badgeText = "60";
        else if (activePause === "pause5")
            badgeText = "5";
        chrome.action.setBadgeText({ text: badgeText }).catch(console.error);
    });
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO0lBQ3hDLDBCQUEwQixFQUFFO0FBQzlCLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7SUFDMUMsMEJBQTBCLEVBQUU7QUFDOUIsQ0FBQyxDQUFDO0FBRUYsU0FBUywwQkFBMEI7SUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQThCLEVBQUUsRUFBRTtRQUN4RSxJQUFJLFNBQVMsR0FBRyxFQUFFO1FBQ2xCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXO1FBRXBDLElBQUksV0FBVyxLQUFLLFNBQVM7WUFBRSxTQUFTLEdBQUcsSUFBSTthQUMxQyxJQUFJLFdBQVcsS0FBSyxTQUFTO1lBQUUsU0FBUyxHQUFHLElBQUk7YUFDL0MsSUFBSSxXQUFXLEtBQUssU0FBUztZQUFFLFNBQVMsR0FBRyxJQUFJO2FBQy9DLElBQUksV0FBVyxLQUFLLFFBQVE7WUFBRSxTQUFTLEdBQUcsR0FBRztRQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ3RFLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aWRlby1zbGVlcC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY2hyb21lLnJ1bnRpbWUub25TdGFydHVwLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgdXBkYXRlQmFkZ2VUZXh0RnJvbVN0b3JhZ2UoKVxufSlcblxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICB1cGRhdGVCYWRnZVRleHRGcm9tU3RvcmFnZSgpXG59KVxuXG5mdW5jdGlvbiB1cGRhdGVCYWRnZVRleHRGcm9tU3RvcmFnZSgpIHtcbiAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoXCJhY3RpdmVQYXVzZVwiLCAoZGF0YTogeyBhY3RpdmVQYXVzZT86IHN0cmluZyB9KSA9PiB7XG4gICAgbGV0IGJhZGdlVGV4dCA9IFwiXCJcbiAgICBjb25zdCBhY3RpdmVQYXVzZSA9IGRhdGEuYWN0aXZlUGF1c2VcblxuICAgIGlmIChhY3RpdmVQYXVzZSA9PT0gXCJwYXVzZTMwXCIpIGJhZGdlVGV4dCA9IFwiMzBcIlxuICAgIGVsc2UgaWYgKGFjdGl2ZVBhdXNlID09PSBcInBhdXNlNDVcIikgYmFkZ2VUZXh0ID0gXCI0NVwiXG4gICAgZWxzZSBpZiAoYWN0aXZlUGF1c2UgPT09IFwicGF1c2U2MFwiKSBiYWRnZVRleHQgPSBcIjYwXCJcbiAgICBlbHNlIGlmIChhY3RpdmVQYXVzZSA9PT0gXCJwYXVzZTVcIikgYmFkZ2VUZXh0ID0gXCI1XCJcbiAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IGJhZGdlVGV4dCB9KS5jYXRjaChjb25zb2xlLmVycm9yKVxuICB9KVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9