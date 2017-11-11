let containerStyle = 
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
let iframeStyle = 
`
background: none; 
border: 0px; 
bottom: 0px; 
float: none; 
height: 100%; 
left: 0px; 
margin: 0px; 
padding: 0px; 
position: absolute; 
right: 0px; 
top: 0px; 
width: 100%;
`;

let container = document.createElement('div');
container.style = containerStyle;

let iframe = document.createElement('iframe');
iframe.setAttribute('allowTransparency', 'true');
iframe.setAttribute('frameborder', 0);
iframe.setAttribute('scrolling', 'no');
iframe.setAttribute('src', chrome.extension.getURL('src/app/livechat.html'));
iframe.setAttribute('style', iframeStyle);
container.appendChild(iframe);
document.body.appendChild(container);
console.log('done');