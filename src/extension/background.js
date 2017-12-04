var message_count = 0;
const tracking = 'https:' + 'cdn.livechatinc.com/tracking.js';

/*function loadLiveChat(url, callback){
    //https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file?noredirect=1&lq=1

    // Adding the script tag to the head
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

//  Set up our background livechat session
loadLiveChat("https://unpkg.com/@livechat/livechat-visitor-sdk@0.28.4/dist/livechat-visitor-sdk.min.js", function(){
    

const visitorSDK = window.LivechatVisitorSDK.init({
    license: 9242305,
    group: 3,
    });
visitorSDK.on('new_message', (newMessage) => {
    console.log(newMessage);
    message_received();
}); */

chrome.identity.getProfileUserInfo(function(userInfo) {
    chrome.storage.local.set({
        'VC_USER': userInfo
    });

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
    
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Got message? request.type = ' + request.type);
    
    // By only doing a show for each tab, there won't be duplicate or multiple "show"s or "hide"s, which means better performance
    if (request.type === 'RESET_COUNTER') {
        reset_icon();
    }
    if (request.type === 'VISITOR_ENGAGED'){
        // var LC_API = LC_API || {};
        var result = LC_API.visitor_engaged();
        console.log('visitor engaged? ' + result);
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