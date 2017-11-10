// server.js
// It serves index.html, static files and livechat visitor api JS library

var express = require('express');
var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules/@livechat/livechat-visitor-sdk/dist'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
