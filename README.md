# **Jazz - City of Edmonton Internal Application** 

<img src="https://raw.github.com/coe-google-apps-support/jazz-chrome/master/img/large-tile.png" height="70%" width="70%" align="center">

## **Description**
Jazz is an application wrapper for LiveChat's JS API widget, developed by Nathan Storm Kaefer and Jared Rewerts, for City of Edmonton internal executive employees. 
It is in development for iOS, Android, and Chrome as an extension.

By navigating to the application, you are able to easily receive support from a team of designated support agents, instantly.

Chrome Extension example:

<img src="https://raw.github.com/coe-google-apps-support/jazz-chrome/master/img/example.PNG" height="50%" width="50%">

## **Local Installation Instructions:**

1. Download Repo off of Github.
2. Navigate to branch you are testing on.
3. In Google Chrome, navigate to chrome://extensions
4. Check developer options, and load this repo as an unpacked extension.


Click on the new icon in the Chrome extension bar, and a pop-up should open, connecting you to the Livechat service.


### **Important:**
### Config.js
To get the livechat service working, you need a js file "config.js" that defines a "Jazz" object, with properties license and group. This config.js file is located with popup.js and background.js.

For example: 
```javascript
const Jazz = {
    license: LICENSE_HERE;
    group: GROUP_HERE;
}
```

### CSS
As well, if you want your popup to show correctly, use the CSS in the livechat.css file, and place it in the LiveChat custom css area, in LiveChat settings.

