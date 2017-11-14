const tracking = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';

// Wait until both are populated

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (!mutation.addedNodes) return;

        for (let i = 0; i < mutation.addedNodes.length; i++) {
            // do things to your newly added nodes here
            let node = mutation.addedNodes[i];
            if (node.id !== 'livechat-full' && node.id !== 'livechat-compact-container') return;
            setVisibleState();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
});

chrome.storage.sync.get('VC_USER',
    function (value) {
        const template =
            `
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
    chrome.storage.sync.get({'VC_SHOWN': true}, function (result) {
        console.log(result);
        if (result.VC_SHOWN) {
            console.log('Showing')
            chrome.runtime.sendMessage({ type: 'VC_SHOW' });
        }
        else {
            console.log('Hiding')
            chrome.runtime.sendMessage({ type: 'VC_HIDE' });
        }
    });
}

