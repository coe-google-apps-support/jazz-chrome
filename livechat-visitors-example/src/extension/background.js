
chrome.browserAction.onClicked.addListener(function (tab) {
    console.log('Browser Action');
    onShowToggled();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'VC_HIDE') {
        hide();
    }
    else if (request.type === 'VC_SHOW') {
        show();
    }

    return true;
});

function onShowToggled() {
    chrome.storage.sync.get('VC_SHOWN',
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

    return true
}

function show() {
    console.log('showing tabs');
    applyToTabs(function (tab) {
        chrome.storage.sync.set({
            'VC_SHOWN': true
        }, function () {
            chrome.tabs.executeScript(tab.id, {
                file: 'src/extension/show-vc.js'
            })
        });
    }, filter);
}

function hide() {
    console.log('hiding tabs');
    applyToTabs(function (tab) {
        chrome.storage.sync.set({
            'VC_SHOWN': false
        }, function () {
            chrome.tabs.executeScript(tab.id, {
                file: 'src/extension/hide-vc.js'
            })
        });
    }, filter);
}