(()=>{"use strict";const e=document.getElementById("pause5"),t=document.getElementById("pause30"),s=document.getElementById("pause45"),c=document.getElementById("pause60"),a={pause5:e,pause30:t,pause45:s,pause60:c};function n(e,t){for(const e in a){const t=a[e];t&&(t.classList.remove("active"),t.textContent=`Pause in ${e.slice(5)}`)}const s=a[e];s&&(s.textContent=t?`Disable Pause in ${e.slice(5)}`:`Pause in ${e.slice(5)}`,s.classList.toggle("active",t))}function o(e){let t="";"pause30"===e?t="30":"pause45"===e?t="45":"pause60"===e?t="60":"pause5"===e&&(t="5"),chrome.action.setBadgeText({text:t}).catch(console.error)}function i(e,t){chrome.storage.sync.get("activePause",(s=>{s.activePause===e?chrome.storage.sync.remove("activePause",(()=>{n(e,!1),chrome.action.setBadgeText({text:""}).catch(console.error),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{void 0!==e[0].id&&chrome.tabs.sendMessage(e[0].id,{clearPausing:!0}).catch(console.error)}))})):chrome.storage.sync.set({activePause:e},(()=>{n(e,!0),o(e),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{void 0!==e[0].id&&chrome.tabs.sendMessage(e[0].id,{startPauseTimer:t}).catch(console.error)}))}))}))}chrome.storage.sync.get("activePause",(e=>{n(e.activePause,!0),o(e.activePause)})),null==t||t.addEventListener("click",(()=>i("pause30",18e5))),null==s||s.addEventListener("click",(()=>i("pause45",27e5))),null==c||c.addEventListener("click",(()=>i("pause60",36e5))),null==e||e.addEventListener("click",(()=>i("pause5",3e5)))})();
//# sourceMappingURL=popup.js.map