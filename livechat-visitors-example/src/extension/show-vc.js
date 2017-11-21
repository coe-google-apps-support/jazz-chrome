console.log('show-vc')

showVCText =
`
var LC_API = LC_API || {};
LC_API.open_chat_window();
LC_API.minimize_chat_window();
`

vcShowElement = document.getElementById('vc-style-overrides');
if (vcShowElement) {
    vcShowElement.parentNode.removeChild(vcShowElement);
}

vcShowElement = document.createElement('script');
vcShowElement.type = 'text/javascript';
vcShowElement.id = 'vc-style-overrides';
vcShowElement.innerHTML = showVCText;
document.getElementsByTagName('head')[0].appendChild(vcShowElement);