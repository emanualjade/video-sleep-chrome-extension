(()=>{"use strict";function e(){chrome.storage.sync.get("activePause",(e=>{let t="";const a=e.activePause;"pause30"===a?t="30":"pause45"===a?t="45":"pause60"===a?t="60":"pause5"===a&&(t="5"),chrome.action.setBadgeText({text:t}).catch(console.error)}))}chrome.runtime.onStartup.addListener((()=>{e()})),chrome.runtime.onInstalled.addListener((()=>{e()}))})();
//# sourceMappingURL=background.js.map