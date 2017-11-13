const tracking = chrome.extension.getURL('src/extension/tracking.js');
const template = 
`
window.__lc = window.__lc || {};
window.__lc.license = 9242305;
window.__lc.mute_csp_errors = true;
(function() {
  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
  lc.src = "${tracking}";
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();
`

// Insert at end of body.

let script = document.createElement('script');
script.type = 'text/javascript'
script.innerHTML = template;

document.body.appendChild(script);