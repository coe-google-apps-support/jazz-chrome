if (!Jazz) {
    throw new Error('Jazz object is not defined.');
}

var message_count = 0;
var VC_USER_EMAIL;
const tracking = 'https:' + 'cdn.livechatinc.com/tracking.js';

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

chrome.identity.onSignInChanged.addListener(function (account, signedIn) {
    // Reload the extension, to get current user profile
    chrome.runtime.reload();
});

chrome.identity.getProfileUserInfo(function (userInfo) {
    chrome.storage.local.set({
        'VC_USER': userInfo
    });
    VC_USER_EMAIL = userInfo.email;

    if (VC_USER_EMAIL == ""){
        // User is not signed into chrome

        // Don't load our livechat code
        
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Got message? request.type = ' + request.type);
    
    if (request.type === 'RESET_COUNTER') {
        reset_icon();
    }
    if (request.type === 'CHAT_STARTED') {
        console.log('Got Chat ID from popup, it is: ' + request.data);
        chat_id = request.data; // Is a string

        // DOESN'T CURRENTLY WORK, REALLY MESSES UP BACKGROUND.HTML
        // LOTS OF ERRORS
        //LC_API = LC_API | {};
        //LC_API.start_chat();
        
    }
    
    return true;
});


console.log('Setting LC_API callbacks');
var LC_API = LC_API || {};
// Messages
LC_API.on_message = function(data) {  
    console.log("we got a message!");
    if(data.user_type == 'agent'){
        message_received();
    }
};

// Get the Chat ID, after chat started
// Only occurs if chat starts with background.js
LC_API.on_after_load = function() {
    LC_API.disable_sounds();
    LC_API.open_chat_window();
    visitor_id = LC_API.get_visitor_id();
    console.log("Visitor ID: " + visitor_id);


    chat_id = LC_API.get_chat_id();
    console.log("Chat ID: " + chat_id);
};

LC_API.on_before_load = function() {
    console.log("on before load");
};


function message_received(){
    console.log("we received and acted upon a message!");
    message_count++;
    chrome.browserAction.setBadgeText({text: message_count.toString()});
    chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]}); //red
}

function reset_icon(){
    message_count = 0;
    chrome.browserAction.setBadgeText({text: ''});
    chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 0]}); //blank transparent background
};

// Sketchy workaround. Simulate a click on the livechat button, hoping that it is loaded.
setTimeout(function(){
    window.document.getElementById("livechat-compact-view").click();
    console.log('simulate click');
}, 8000);