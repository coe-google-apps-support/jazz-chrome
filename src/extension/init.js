let maxStyle = 
`
background-color: transparent; 
border: 0px; 
bottom: 32px; 
height: 700px; 
overflow: hidden; 
position: fixed; 
right: 32px; 
visibility: visible; 
width: 400px; 
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
container.id = 'vip-chat-container';

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
        setTimeout(() => {
            container.style.width = '100px';
            container.style.height = '100px';
        }, 200)        
    }
    else if (event.data.type === 'VC_MAXIMIZE') {
        container.style.width = '400px';
        container.style.height = '700px';
    }
});
