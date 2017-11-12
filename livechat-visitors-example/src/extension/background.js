
chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('Browser Action');    
    onShowToggled(
        function(tab) {
            chrome.storage.sync.set({
                'VC_SHOWN': true
            }, function() {
                chrome.tabs.executeScript(tab.id, {
                    file: 'src/extension/show-vc.js'
                })
            });
        }, function(tab) {
            chrome.storage.sync.set({
                'VC_SHOWN': false
            }, function() {
                chrome.tabs.executeScript(tab.id, {
                    file: 'src/extension/hide-vc.js'
                })
            });
        }
    );
});

function onShowToggled(showCB, hideCB) {
    chrome.storage.sync.get('VC_SHOWN',
    function(value) {
        console.log(value);
        if (value.VC_SHOWN) {
            console.log('hiding tabs');
            applyToTabs(hideCB, filter);
        }
        else {
            console.log('showing tabs');
            applyToTabs(showCB, filter);
        }
    });
}

function applyToTabs(func, filter) {
    chrome.tabs.query({}, function(tabs) {
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