var visitor_id;
var chat_id;
var message_count = 0;
var welcome_message = "Hello! Test123";
var VC_USER_EMAIL;
var timerOn;
const tracking = 'https:' + 'cdn.livechatinc.com/tracking.js';


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
    window.__lc.license = 9242305;
    window.__lc.mute_csp_errors = true;
    window.__lc.group = 3; // chrome extension group
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
    
    if (request.type === 'RESET_COUNTER') {
        reset_icon();
    }
    if (request.type === 'CHAT_ID') {
        console.log('Got Chat ID from popup, it is: ' + request.data);
        chat_id = request.data; // Is a string
        
        // Now set the get_pending_chats REST API call to run
        if (timerOn != null){
            clearInterval(timerOn);
        }
        // setInterval(get_pending_chats, 5000); // execute every 5 seconds
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
LC_API.on_after_load = function()
{
  //console.log('Chat started with agent: ' + data.agent_name);
  //chat_id = LC_API.get_chat_id(); GETTING CHAT_ID FROM POPUP, NOT NEEDED
  //console.log('Chat ID is: ' + chat_id);


  // Halfway implemented REST API code
    
  //visitor_id = Math.floor(Math.random() * 1000000000); // 1 billion
  visitor_id = LC_API.get_visitor_id();
  console.log(visitor_id);

  // Start the chat
  /* NOT NEEDED - If we're starting the chat through JS API in popup.js, and getting the chat_id
    FUN FACT: CHAT_ID ISN'T THE SAME AS SECURED_SESSION_ID
  $.ajax({
      url: "https://api.livechatinc.com/visitors/"+visitor_id.toString()+"/chat/start?licence_id=9242305&welcome_message="+welcome_message+"&name="+VC_USER_EMAIL+"&email="+VC_USER_EMAIL+"&group=3",
      beforeSend: function(xhr) {
          xhr.setRequestHeader("X-API-VERSION", "2")
      }, success: function(data){
          //process the JSON data etc
          console.log(data);
      }
  }) */


  chat_id = LC_API.get_chat_id();
  console.log("get_chat_id() is " + chat_id);
  
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

function get_pending_chats() {
// send HTTP Request to get pending chats immediately
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://api.livechatinc.com/visitors/"+visitor_id+"/chat/get_pending_messages?licence_id="+9242305+"&secured_session_id="+chat_id, true);
  xhttp.setRequestHeader("Content-type", "application/json"); 

  $.ajax({
      url: "https://api.livechatinc.com/visitors/"+visitor_id.toString()+"/chat/get_pending_messages?licence_id="+9242305+"&secured_session_id="+chat_id.toString(),
      beforeSend: function(xhr) {
          xhr.setRequestHeader("X-API-VERSION", "2")
      }, success: function(data){
          //process the JSON data etc
          console.log(JSON.stringify(data));
      }
  })
}
