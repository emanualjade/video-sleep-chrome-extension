(()=>{"use strict";(()=>{function e(){const e=document.getElementById("black-overlay");e&&document.body.removeChild(e)}let t;function o(o){s(),t=window.setTimeout((()=>{const t=document.querySelector("video");t&&!t.paused&&(t.pause(),function(){const t=document.createElement("div");t.id="black-overlay",t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="100%",t.style.backgroundColor="black",t.style.opacity="1",t.style.zIndex="9999",t.addEventListener("click",e),document.body.appendChild(t)}())}),o)}function s(){void 0!==t&&(clearTimeout(t),t=void 0)}function n(e){switch(e){case"pause30":return 18e5;case"pause45":return 27e5;case"pause60":return 36e5;case"pause5":return 3e5;default:return}}chrome.runtime.onMessage.addListener((e=>{void 0!==e.startPauseTimer&&(s(),o(e.startPauseTimer)),e.clearPausing&&s()})),chrome.storage.sync.get("activePause",(e=>{const t=n(e.activePause);void 0!==t&&o(t),function(){const e=document.querySelector("video");e&&e.addEventListener("play",(()=>{chrome.storage.sync.get("activePause",(e=>{const t=n(e.activePause);void 0!==t&&o(t)}))}))}()}))})()})();
//# sourceMappingURL=content.js.map