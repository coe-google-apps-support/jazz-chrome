var ncp = require('ncp').ncp;

ncp.limit = 16;

ncp('./livechat-visitors-example/src/app/', './docker/build', function (err) {
    if (err) {
    return console.error(err);
    }
    console.log('done copying app');
});

ncp('./livechat-visitors-example/src/mobile/', './docker/build', function (err) {
    if (err) {
    return console.error(err);
    }
    console.log('done copying mobile');
});