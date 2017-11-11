let maxStyle = 
`
background-color: transparent; 
border: 0px; 
bottom: 32px; 
height: 600px; 
overflow: hidden; 
position: fixed; 
right: 32px; 
visibility: visible; 
width: 400px; 
z-index: 2147483639; 
opacity: 1;
`
let minStyle = 
`
background-color: transparent; 
border: 0px; 
bottom: 32px; 
height: 100px;
width: 100px;
overflow: hidden; 
position: fixed; 
right: 32px; 
visibility: visible; 
z-index: 2147483639; 
opacity: 1;
`
let iframeStyle = 
`
width: 100%;
height: 100%;
position: absolute; 
right: 0px; 
top: 0px; 
bottom: 0px;
left: 0px;
`;

let container = document.createElement('div');
container.style = maxStyle;

let iframe = document.createElement('iframe');
iframe.setAttribute('allowTransparency', 'true');
iframe.setAttribute('frameborder', 0);
iframe.setAttribute('marginheight', '24px');
iframe.setAttribute('marginwidth', '24px');
iframe.setAttribute('scrolling', 'no');
iframe.setAttribute('src', chrome.extension.getURL('src/app/livechat.html'));
iframe.setAttribute('style', iframeStyle);
container.appendChild(iframe);
document.body.appendChild(container);

let hostRegExp = /chrome-extension:\/\/\w*/;
let host = chrome.extension.getURL('src/app/livechat.html').match(hostRegExp)[0];

window.addEventListener('message', (event) => {
    if (event.origin !== host) return;

    if (event.data.type === 'VC_MINIMIZE') {
        container.setAttribute('style', minStyle);
    }
    else if (event.data.type === 'VC_MAXIMIZE') {
        container.setAttribute('style', maxStyle);
    }
});
