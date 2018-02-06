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

    (function(c, h, a, t) {
      c[t]=c[t]||function(){(c[t].q=c[t].q||[]).push(arguments)};
      c[t].license = Jazz.license;
      c[t].d=+new Date;
      var j = h.createElement(a); j.type = 'text/javascript'; j.async = true;
      j.src = 'https://cdn.chatio-static.com/widget/init/script.' + c[t].license + '.js';
      var s = h.getElementsByTagName(a)[0]; s.parentNode.insertBefore(j, s);
    })(window, document, 'script', '__chatio');

});




// Make sure the chat window opens on launch
// var LC_API = LC_API || {};
// LC_API.on_after_load = function() {
//     LC_API.disable_sounds();
//     LC_API.open_chat_window();
//     loaded = true;
//     console.log('on after load happened, opened the chat window'); // But this runs?
// };
// // Send visitor ID to background, so it can get pending chats and keep connection open
// LC_API.on_chat_started = function(data)
// {
//     chat_id = LC_API.get_chat_id();
//     chrome.runtime.sendMessage({ type: 'CHAT_STARTED', data: chat_id.toString() });
// }


// Reset our unread message counter
chrome.runtime.sendMessage({ type: 'RESET_COUNTER' });

// Check that livechat is running
setTimeout(function(){if (loaded == false){error_message("Unable to connect to the Jazz service. Please relaunch the pop-up and try again later.");}}, 12000);

function error_message(error){
    // Only use this function when livechat cannot be reached, and no livechat code has been loaded
    
    // Add Jazz error message
    console.log("Error has happened. Error = " + error);
    var errorText = document.createTextNode(error);
    var errorMessage = document.createElement("div");
    errorMessage.id = "not_signed_in";
    errorMessage.appendChild(errorText);
    errorMessage.style.cssText = "padding:5px;position:relative;width:100%;min-width:300px;z-index:100;text-align:center;font-size: x-large;";
    document.body.appendChild(errorMessage);

    // Add Jazz image
    var errorImage = document.createElement("IMG");
    errorImage.src = "../../img/jazz-64.png";
    errorImage.id = "error_image";
    errorImage.style.cssText = "padding:5px;display:block;margin:auto;";
    document.body.appendChild(errorImage);
}