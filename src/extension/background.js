var visitor_id;
var chat_id;
var message_count = 0;
var welcome_message = "Hello! Test123";
var VC_USER_EMAIL;
const tracking = 'https:' + 'cdn.livechatinc.com/tracking.js';


/* Not needed right now 
const visitorSDK = window.LivechatVisitorSDK.init({
    license: 9242305,
    group: 3,
    });
visitorSDK.on('chat_started', (chatData) => {
    chat_id = chatData.chatId;
    console.log("Chat started with ID: " + chat_id);
})
visitorSDK.on('new_message', (newMessage) => {
    console.log("Received a message: " + newMessage.text + " from " + newMessage.authorId + " with chat ID: " + newMessage.chatId);
    message_received();
}); */

chrome.identity.getProfileUserInfo(function(userInfo) {
    chrome.storage.local.set({
        'VC_USER': userInfo
    });
    VC_USER_EMAIL = userInfo.email;

    // Set up livechat backend (so we can get notifications)
    window.__lc = window.__lc || {};
    window.__lc.license = 9242305;
    window.__lc.mute_csp_errors = true;
    window.__lc.visitor = {
        name: userInfo.email,
        email: userInfo.email
    };
    (function() {
        var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
        lc.src = tracking;
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
    })();

    
    
    /* Halfway implemented REST API code
    
    visitor_id = Math.floor(Math.random() * 1000000000); // 1 billion
    //visitor_id = LC_API.get_visitor_id();
    console.log(visitor_id);

    // Start the chat
    NOT NEEDED - If we're starting the chat through JS API
    $.ajax({
        url: "https://api.livechatinc.com/visitors/<"+visitor_id.toString()+">/chat/start?licence_id=9242305&welcome_message="+welcome_message+"&name="+VC_USER_EMAIL+"&email="+VC_USER_EMAIL+"&group=3",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-API-VERSION", "2")
        }, success: function(data){
            //process the JSON data etc
            console.log(data);
        }
    })


    chat_id = LC_API.get_chat_id();
    console.log(chat_id);
    

    /* send HTTP Request to start chat immediately
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.livechatinc.com/visitors/<"+visitor_id+">/chat/get_pending_messages?licence_id="+9242305+"secured_session_id="+chat_id, true);
    xhttp.setRequestHeader("Content-type", "application/json"); 

    $.ajax({
        url: "https://api.livechatinc.com/visitors/<"+visitor_id.toString()+">/chat/get_pending_messages?licence_id="+9242305+"&secured_session_id="+chat_id.toString(),
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-API-VERSION", "2")
        }, success: function(data){
            //process the JSON data etc
            console.log(data);
        }
    }) */
    
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Got message? request.type = ' + request.type);
    
    if (request.type === 'RESET_COUNTER') {
        reset_icon();
    }
    if (request.type === 'VISITOR_ENGAGED'){
        LC_API = LC_API || {};
        LC_API.open_chat_window();
        console.log('chat window opened?');
    }

    return true;
});

var LC_API = LC_API || {};
// Messages
LC_API.on_message = function(data)
{  
    console.log("we got a message!");
    if(data.user_type == 'agent'){
        message_received();
    }
};

// Get the Chat ID, after chat started
// Only occurs if chat starts with background.js
LC_API.on_chat_started = function(data)
{
  console.log('Chat started with agent: ' + data.agent_name);
  chat_id = LC_API.get_chat_id();
  console.log('Chat ID is: ' + chat_id);
};

// Get visitor ID
//LC_API.on_after_load = function() {
    
//};


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




//});


/*

var LC_API = LC_API || {};
window.__lc = window.__lc || {};


chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
        //inject();
    }
});

function onShowToggled() {
    chrome.storage.local.get('VC_SHOWN',
        function (value) {
            console.log(value);
            if (value.VC_SHOWN) {
                hide();
            }
            else {
                show();
            }
        });
}

function applyToTabs(func, filter) {
    chrome.tabs.query({}, function (tabs) {
        for (let i = 0; i < tabs.length; i++) {
            if (!filter(tabs[i])) continue;
            func(tabs[i]);
            console.log(`Applying for ${tabs[i].id}`);
        }
    });
}

function filter(tab) {
    if (!tab.id) return false;
    if (!tab.url.startsWith('http://') && !tab.url.startsWith('https://')) return false;
    if (tab.url.startsWith('https://chrome.google.com')) return false;
    if (tab.url.includes('livechatinc')) return false;

    return true
}

function show() {
    console.log('showing tabs');
    applyToTabs(show_tab, filter);
}

function hide() {
    console.log('hiding tabs');
    applyToTabs(hide_tab, filter);
}

function inject() {
    applyToTabs(function (tab) {
        chrome.tabs.executeScript(tab.id, {
            file: 'src/extension/inject.js'
        })
    }, filter);
}

function show_tab(tab) {
    chrome.storage.local.set({
        'VC_SHOWN': true
    }, function () {
        chrome.tabs.executeScript(tab.id, {
            file: 'src/extension/show-vc.js'
        });
        chrome.browserAction.setBadgeText({ text: 'On' });
    });
}

function hide_tab(tab) {
    chrome.storage.local.set({
        'VC_SHOWN': false
    }, function () {
        chrome.tabs.executeScript(tab.id, {
            file: 'src/extension/hide-vc.js'
        });
        chrome.browserAction.setBadgeText({ text: 'Off' });
    });
} */