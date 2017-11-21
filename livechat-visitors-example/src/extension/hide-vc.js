console.log('hide-vc');

hideVCStyles =
`
var LC_API = LC_API || {};
LC_API.minimize_chat_window();
LC_API.hide_chat_window();
`

vcHideElement = document.getElementById('vc-style-overrides');
if (vcHideElement) {
    vcHideElement.parentNode.removeChild(vcHideElement);
}

vcHideElement = document.createElement('script');
vcHideElement.type = 'text/javascript';
vcHideElement.id = 'vc-style-overrides';
vcHideElement.innerHTML = hideVCStyles;
document.getElementsByTagName('head')[0].appendChild(vcHideElement);