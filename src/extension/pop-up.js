const tracking = 'https:' + 'cdn.livechatinc.com/tracking.js';
console.log('pop-up.js');

chrome.storage.local.get('VC_USER',
function (value) {

    var LC_API = LC_API || {};
    LC_API.on_before_load = function() {
        LC_API.disable_sounds();
        console.log('on before load happened');
    };

    LC_API.on_after_load = function() {
        LC_API.open_chat_window();
        console.log('on after load happened');
    };

    window.__lc = window.__lc || {};
    window.__lc.license = 9242305;
    window.__lc.mute_csp_errors = true;
    window.__lc.visitor = {
        name: value.VC_USER.email,
        email: value.VC_USER.email
    };
    (function() {
        var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
        lc.src = tracking;
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
    })();

});

