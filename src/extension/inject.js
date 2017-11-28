const tracking = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
console.log('inject.js');

// If this page already has a chat container, skip everything.
// Note that a simple return won't work here.
if (!document.getElementById('livechat-full')) {

window.addEventListener('message', function(event) {
    if (event.data.type === 'VC_LIVECHAT_MESSAGE') {
        chrome.storage.local.get({'VC_SHOWN': true}, function (result) {
            if (!result.VC_SHOWN) {
                chrome.runtime.sendMessage({ type: 'VC_SHOW' });
            }
        });
    }
    else if (event && event.data && event.data.type && event.data.type === 'VC_LIVECHAT_ACTIVE') {
        setVisibleState(); // Check if livechat is active and ready to go, then show our visible button
    }
});

// Hiding livechat container at beginning
let vsInitElement = document.createElement('style');
vsInitElement.type = 'text/css';
vsInitElement.id = 'vc-initial-style';
vsInitElement.innerHTML = `
    #livechat-full {
        display: none;
    }
    
    #livechat-compact-container {
        display: none;
    }
`;
document.getElementsByTagName('head')[0].appendChild(vsInitElement);

// Wait until both are populated

chrome.storage.local.get('VC_USER',
    function (value) {
        const template =
            `
var LC_API = LC_API || {};
LC_API.on_before_load = function() {
    LC_API.disable_sounds();
    window.postMessage({
        'type': 'VC_LIVECHAT_ACTIVE'
    }, '*')
};

// Messages
LC_API.on_message = function(data)
{
  window.postMessage({
      'type': 'VC_LIVECHAT_MESSAGE'
  }, '*')
};

window.__lc = window.__lc || {};
window.__lc.license = 9242305;
window.__lc.mute_csp_errors = true;
window.__lc.visitor = {
    name: '${value.VC_USER.email}',
    email: '${value.VC_USER.email}'
};
(function() {
    var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
    lc.src = "${tracking}";
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();
`

        let script = document.createElement('script');
        script.type = 'text/javascript'
        script.innerHTML = template;

        document.body.appendChild(script);
    });

// Either shows or hides our floating button
function setVisibleState() {
    chrome.storage.local.get({'VC_SHOWN': true}, function (result) {
        if (result.VC_SHOWN) {
            chrome.runtime.sendMessage({ type: 'VC_SHOW' });
        }
        else {
            chrome.runtime.sendMessage({ type: 'VC_HIDE' });
        }
    });
}

}
