const tracking = 'https:' + 'cdn.livechatinc.com/tracking.js';
console.log('pop-up.js');

// Add livechat init code
chrome.storage.local.get('VC_USER',
function (value) {

    var LC_API = LC_API || {};
    LC_API.on_before_load = function() {
        LC_API.disable_sounds();
        console.log('on before load happened'); // is never run?
    };

    LC_API.on_after_load = function() {
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

// Hiding livechat container at beginning
// Eventually this could be moved to the livechat site, but this works for now
let vsInitElement = document.createElement('style');
vsInitElement.type = 'text/css';
vsInitElement.id = 'vc-initial-style';
vsInitElement.innerHTML = `    
    #livechat-compact-container {
        display: none !important;
    }

    #minimize { /* Doesn't do anything, need to figure out why */
        display: none !important;
    }

    #livechat-full {
        position: inherit !important;
        display: inherit!important;
        top: 0 !important;
        bottom: 0 !important;
        right: 0 !important;
        height: 550px !important;
      }
      
      #wrapper {
        padding-right: 0;
        padding-top: 0;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
      }
      
      #title {
        border-radius: 0;
      }
`;
document.getElementsByTagName('head')[0].appendChild(vsInitElement);

// Make sure the chat window opens on launch
var LC_API = LC_API || {};
LC_API.on_after_load = function() {
    LC_API.open_chat_window();
    console.log('on after load happened'); // But this runs?
};

