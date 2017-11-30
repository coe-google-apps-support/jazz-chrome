
chrome.identity.getProfileUserInfo(function(userInfo) {
    chrome.storage.local.set({
        'VC_USER': userInfo
    });
})

/*chrome.browserAction.onClicked.addListener(function (tab) {    
    console.log('Browser Action');
    onShowToggled();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Got message? request.type = ' + request.type + ' and sender.tab.url = ' + sender.tab.url);
    
    // By only doing a show for each tab, there won't be duplicate or multiple "show"s or "hide"s, which means better performance
    if (request.type === 'VC_SHOW_TAB') {
        show_tab(sender.tab);
    }
    else if (request.type === 'VC_HIDE_TAB') {
        hide_tab(sender.tab);
    }

    return true;
});

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