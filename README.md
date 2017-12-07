# **City of Edmonton - VIP Chat** 

## Steps to install this chrome extension:

1. Download Repo off of Github.
2. Navigate to branch you are testing on.
3. In Google Chrome, navigate to chrome://extensions
4. Check developer options, and load this repo as an unpacked extension.


Click on the new icon in the Chrome extension bar, and a pop-up should open, connecting you to the Livechat service.


### **To test connectivity issue:**
Make sure you open the background.html developer console from chrome://extensions. To visually see when the chat is connected to background.js or not, notice the red "notification" badge pop-up when background.js is connected to a chat, and we receive a message from an agent.

The notification appears when the agent starts the chat with a visitor (the visitor must have their extension popup open), and the agent sends messages to the visitor. Background.js is connected, and remains connected even when pop-up.js is closed and opened again. **Chat does not close**.

The notification does not appear when the user messages the agent through their extension popup. Background.js should be connected, but somehow loses connection when the user opens up the pop-up. Once the pop-up is closed for about 20-30 seconds, **the chat closes**. 

All of these statements can be confirmed by looking at the Google Chrome Developer Console.


### **My thoughts**
I'm pretty sure this has to do with background.js not starting a chat session, when popup does. This can be confirmed through using the LC_API.get_chat_id() method.

For instance: When the agent starts the chat, background.js receives the session ping and starts the chat. It returns a chat ID through LC_API.get_chat_id(). This chat_id is the same as the one returned from popup.js (run LC_API.get_chat_id() in dev console of popup).

When the user starts the chat, LC_API.get_chat_id() of background.js is still null. No chat session has been started, for some unknown reason.

