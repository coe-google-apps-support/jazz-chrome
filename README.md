# **City of Edmonton - Jazz Chat** 

## **Installation Instructions:**

1. Download Repo off of Github.
2. Navigate to branch you are testing on.
3. In Google Chrome, navigate to chrome://extensions
4. Check developer options, and load this repo as an unpacked extension.


Click on the new icon in the Chrome extension bar, and a pop-up should open, connecting you to the Livechat service.


## **Important:**
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

