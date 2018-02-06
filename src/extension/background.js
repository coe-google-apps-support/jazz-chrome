if (!Jazz) {
    throw new Error('Jazz config object is not defined.');
}

var message_count = 0;
var VC_USER_EMAIL;
const tracking = 'https:' + 'cdn.livechatinc.com/tracking.js';

/**
 * Temporary fix. Opens a standalone web page so our users don't lose their chats.
 */
chrome.browserAction.onClicked.addListener(function (activeTab) {
    let rootURL = 'https://secure.livechatinc.com/licence/' + Jazz.license + '/open_chat.cgi?'
    
    chrome.storage.local.get('VC_USER', function(result) {
        console.log(result)
        let params = 
            'groups=' + Jazz.group +
            '&name=' + result.VC_USER.email + 
            '&email=' + result.VC_USER.email

        let newURL = rootURL + params;
        chrome.tabs.create({ url: newURL });
    });
});

/**
 * If the user is changed, reload the extension.
 */
chrome.identity.onSignInChanged.addListener(function (account, signedIn) {
    chrome.runtime.reload();
});

/**
 * Gets the logged in user. Starts a background live chat.
 */
chrome.identity.getProfileUserInfo(function (userInfo) {
    chrome.storage.local.set({
        'VC_USER': userInfo
    });
    VC_USER_EMAIL = userInfo.email;

    if (VC_USER_EMAIL == ""){
        // User is not signed into chrome. Don't load our livechat code.
        return;
    }

    // Set up livechat backend (so we can get notifications)
    window.__lc = window.__lc || {};
    window.__lc.license = Jazz.license;
    window.__lc.mute_csp_errors = true;
    window.__lc.group = Jazz.group; // chrome extension group
    window.__lc.visitor = {
        name: userInfo.email,
        email: userInfo.email
    };
    (function() {
        var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
        lc.src = tracking;
        lc.addEventListener("load", function() {
            console.log("livechat has fully loaded");
        })
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
    })();
});

/**
 * Allows background to receive messages from other areas (namely the popup)
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Got message? request.type = ' + request.type);
    
    if (request.type === 'RESET_COUNTER') {
        resetIcon();
    }
    if (request.type === 'CHAT_STARTED') {
        console.log('Got Chat ID from popup, it is: ' + request.data);
        chat_id = request.data; // Is a string
    }
    
    return true;
});

/**
 * Handles forced updates
 */
chrome.runtime.onUpdateAvailable.addListener(function (details) {
    chrome.runtime.reload();
});

///// LiveChat API /////
var LC_API = LC_API || {};
// Messages
LC_API.on_message = function(data) {  
    console.log("we got a message!");
    if(data.user_type == 'agent'){
        messageReceived();
    }
};

/**
 * Gets info about the chat.
 * Get the Chat ID, after chat started
 * Only occurs if chat starts with background.js
 */
LC_API.on_after_load = function() {
    LC_API.disable_sounds();
    LC_API.open_chat_window();
    visitor_id = LC_API.get_visitor_id();
    console.log("Visitor ID: " + visitor_id);


    chat_id = LC_API.get_chat_id();
    console.log("Chat ID: " + chat_id);
};

/**
 * Increments the # of messages badge.
 */
function messageReceived() {
    message_count++;
    chrome.browserAction.setBadgeText({text: message_count.toString()});
    chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]}); //red
}

/**
 * Clears the badge text containing the messages indicator.
 */
function resetIcon() {
    message_count = 0;
    chrome.browserAction.setBadgeText({text: ''});
    chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 0]}); //blank transparent background
};
