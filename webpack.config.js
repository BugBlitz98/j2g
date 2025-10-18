const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/@mediapipe/,
          /node_modules\/.*\.js\.map$/,
        ],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /\.js\.map$/,
      contextRegExp: /@mediapipe/,
    }),
  ],
  ignoreWarnings: [
    {
      module: /node_modules\/@mediapipe/,
      message: /Failed to parse source map/,
    },
  ],
};
