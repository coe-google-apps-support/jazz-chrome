try{
    if (!Jazz) {
        throw new Error('Jazz object is not defined.')
    }
}
catch (err) {
    error_message(err);
}


var chat_id;
var loaded = false;
const tracking = 'https:' + 'cdn.livechatinc.com/tracking.js';


// Add livechat init code
chrome.storage.local.get('VC_USER',
function (value) {
    if (value.VC_USER.email == ""){
        // User is not signed into chrome

        error_message("To use Jazz, please sign into Google Chrome.");
        
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
    window.__lc.license = Jazz.license;
    window.__lc.mute_csp_errors = true;
    window.__lc.group = Jazz.group; // chrome extension group
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
    loaded = true;
    console.log('on after load happened, opened the chat window'); // But this runs?
};
// Send visitor ID to background, so it can get pending chats and keep connection open
LC_API.on_chat_started = function(data)
{
    chat_id = LC_API.get_chat_id();
    chrome.runtime.sendMessage({ type: 'CHAT_STARTED', data: chat_id.toString() });
}
LC_API.on_chat_state_changed = function(data){
    if (data.state == "offline"){
        console.log('we are currently offline');
        error_message("Currently Offline. Please relaunch the pop-up.");
    }
}


// Reset our unread message counter
chrome.runtime.sendMessage({ type: 'RESET_COUNTER' });

// Check that livechat is running
setTimeout(function(){if (loaded == false){error_message("Unable to connect to the Jazz service. Please relaunch the pop-up and try again later.");}}, 4000);

function error_message(error){
    // Only use this function when livechat cannot be reached, and no livechat code has been loaded
    
    // Add Jazz error message
    console.log("Error has happened. Error = " + error);
    var errorText = document.createTextNode(error);
    var errorMessage = document.createElement("div");
    errorMessage.id = "not_signed_in";
    errorMessage.appendChild(errorText);
    errorMessage.style.cssText = "padding:5px;position:relative;width:300px;z-index:100;text-align:center;font-size: x-large;";
    document.body.appendChild(errorMessage);

    // Add Jazz image
    var errorImage = document.createElement("IMG");
    errorImage.src = "../../img/icon-64.png";
    errorImage.id = "error_image";
    errorImage.style.cssText = "padding:5px;display:block;margin:auto;";
    document.body.appendChild(errorImage);
}