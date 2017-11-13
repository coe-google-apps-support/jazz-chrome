// const VC_STYLE_ID = 'vc-style-overrides';

showVCStyleElement = document.getElementById('vc-style-overrides');
if (!showVCStyleElement) {
    showVCStyleElement = document.createElement('style');
    showVCStyleElement.type = 'text/css';
    showVCStyleElement.id = 'vc-style-overrides';
    document.getElementsByTagName('head')[0].appendChild(showVCStyleElement);
}

showVCStyles =
    `
#livechat-full {
    display:block!important;
}

#livechat-compact-container {
    display: block!important;
}
`

console.log('show-vc')
showVCStyleElement.innerHTML = '';
showVCStyleElement.innerHTML = showVCStyles;