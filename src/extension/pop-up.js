var chat_id;
const tracking = 'https:' + 'cdn.livechatinc.com/tracking.js';
console.log('pop-up.js');

// Add livechat init code
chrome.storage.local.get('VC_USER',
function (value) {

    if (value.VC_USER.email == ""){
        // User is not signed into chrome

        var errorMessage = document.createElement("div");
        errorMessage.id = "not_signed_in";
        errorMessage.innerHTML = "To use Jazz, please sign into Google Chrome."
        errorMessage.style.cssText = "padding:5px;position:relative;width:300px;height:100%;z-index:100;text-align:center;font-size: x-large;";
        var body = document.getElementsByTagName("body")[0];
        document.body.appendChild(errorMessage, body);
        
        return;
    }

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
    window.__lc.group = 3; // chrome extension group
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
        height: 500px !important;
      }

      #livechat-full-view {
        left: -15px!important;
        width: 107%!important;
        top: -15px!important;
        height: 110%!important;
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


      /* @media 
      (-webkit-min-device-pixel-ratio: 1.5) {
        #livechat-full {
          height: 300px;
        }
      } */
`;
document.getElementsByTagName('head')[0].appendChild(vsInitElement);


// Make sure the chat window opens on launch
var LC_API = LC_API || {};
LC_API.on_after_load = function() {
    LC_API.open_chat_window();
    console.log('on after load happened, opened the chat window'); // But this runs?
};
// Send visitor ID to background, so it can get pending chats and keep connection open
LC_API.on_chat_started = function(data)
{
    chat_id = LC_API.get_chat_id();
    chrome.runtime.sendMessage({ type: 'CHAT_ID', data: chat_id.toString() });
}


// Reset our unread message counter
chrome.runtime.sendMessage({ type: 'RESET_COUNTER' });


