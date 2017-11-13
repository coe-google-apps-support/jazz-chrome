// const VC_STYLE_ID = 'vc-style-overrides';

hideVCStyleElement = document.getElementById('vc-style-overrides');
if (!hideVCStyleElement) {
    hideVCStyleElement = document.createElement('style');
    hideVCStyleElement.type = 'text/css';
    hideVCStyleElement.id = 'vc-style-overrides';
    document.getElementsByTagName('head')[0].appendChild(hideVCStyleElement);
}

hideVCStyles =
    `
#livechat-full {
    display:none!important;
}

#livechat-compact-container {
    display: none!important;
}
`

console.log('hide-vc')
hideVCStyleElement.innerHTML = '';
hideVCStyleElement.innerHTML = hideVCStyles;