try {
    if (!Jazz) {
        throw new Error('Jazz object is not defined.')
    }
} catch (err) {
    displayError(err);
}


window.onload = function () {
    chrome.storage.local.get('VC_USER',
        function (value) {
            if (value.VC_USER.email == "") {
                displayError("To use Jazz, please sign into Google Chrome.");
                return;
            }

            let params =
                'groups=' + Jazz.group +
                '&name=' + value.VC_USER.email +
                '&email=' + value.VC_USER.email;

            let url = 'https://secure.livechatinc.com/licence/' + Jazz.license + '/open_chat.cgi?' + params;

            let frame = document.getElementById('jazz-content');
            frame.src = url;
        }
    )
}


/////// Functions ////////

function displayError(error) {
    // Add Jazz error message
    console.log("Error has happened. Error = " + error);
    let errorText = document.createTextNode(error);
    let errorMessage = document.createElement("div");
    errorMessage.id = "not_signed_in";
    errorMessage.appendChild(errorText);
    errorMessage.style.cssText = "padding:5px;position:relative;width:100%;min-width:300px;z-index:100;text-align:center;font-size: x-large;";
    document.body.appendChild(errorMessage);

    // Add Jazz image
    let errorImage = document.createElement("IMG");
    errorImage.src = "../../img/jazz-64.png";
    errorImage.id = "error_image";
    errorImage.style.cssText = "padding:5px;display:block;margin:auto;";
    document.body.appendChild(errorImage);
}