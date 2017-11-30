/* This isn't used in pop-up version */


const tracking = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
console.log('inject.js');

// If this page already has a chat container, skip everything.
// Note that a simple return won't work here.
if (!document.getElementById('livechat-full')) {

window.addEventListener('message', function(event) {
    if (event && event.data && event.data.type && event.data.type === 'VC_LIVECHAT_MESSAGE') {
        chrome.storage.local.get({'VC_SHOWN': true}, function (result) {
            if (!result.VC_SHOWN) {
                chrome.runtime.sendMessage({ type: 'VC_SHOW_TAB' });
            }
        });
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

const observer = new MutationObserver(function (mutations) {
    let setVisible = false;
    mutations.forEach(function (mutation) {
        if (!mutation.addedNodes) return;        
        for (let i = 0; i < mutation.addedNodes.length; i++) {
            // do things to your newly added nodes here
            let node = mutation.addedNodes[i];
            if (node.id !== 'livechat-full' && node.id !== 'livechat-compact-container') return;
            setVisible = true;       
        }
    });

    if (setVisible) {
        setVisibleState();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
});

chrome.storage.local.get('VC_USER',
    function (value) {
        const template =
            `
var LC_API = LC_API || {};
LC_API.on_before_load = function() {
    LC_API.disable_sounds();
    console.log('on before load happened');
};

LC_API.on_after_load = function() {
    console.log('on after load happened');
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

function setVisibleState() {
    chrome.storage.local.get({'VC_SHOWN': true}, function (result) {
        if (result.VC_SHOWN) {
            chrome.runtime.sendMessage({ type: 'VC_SHOW_TAB' });
        }
        else {
            chrome.runtime.sendMessage({ type: 'VC_HIDE_TAB' });
        }
    });
}

}
