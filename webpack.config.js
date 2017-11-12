const path = require('path');
const { WebPlugin } = require('web-webpack-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    entry: {
      client: './livechat-visitors-example/src/app/client.js',
      sdk: './livechat-visitors-example/src/app/livechat-visitor-sdk.min.js'
    },
    plugins: [
      new WebPlugin({
        filename: 'livechat.build.html',
        // html template file path（full path relative to webpack.config.js）
        template: './livechat-visitors-example/src/app/livechat.html',
      })
    ]
  };