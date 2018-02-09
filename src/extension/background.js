/*global Jazz*/
/*global chrome*/

if (!Jazz) {
    throw new Error('Jazz config object is not defined.');
}

/**
 * Temporary fix. Opens a standalone web page so our users don't lose their chats.
 */
chrome.browserAction.onClicked.addListener(function (activeTab) {
    let rootURL = 'https://secure.livechatinc.com/licence/' + Jazz.license + '/open_chat.cgi?'
    
    chrome.storage.local.get('VC_USER', function(result) {
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
 * Gets the logged in user.
 */
chrome.identity.getProfileUserInfo(function (userInfo) {
    chrome.storage.local.set({
        'VC_USER': userInfo
    });
});

/**
 * Allows background to receive messages from other areas (namely the popup)
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Jazz no longer handles messages. request.type = ' + request.type);
    return true;
});

/**
 * Handles forced updates
 */
chrome.runtime.onUpdateAvailable.addListener(function (details) {
    chrome.runtime.reload();
});
