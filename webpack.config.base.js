const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    library: 'OpenTender',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        exclude: /node_modules/,
        use: 'file-loader',
      },
      // {
      //   test: /\.svg$/,
      //   exclude: /node_modules/,
      //   use: 'svg-inline-loader',
      // },
    ],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
    // lodash: {
    //   commonjs: 'lodash',
    //   commonjs2: 'lodash',
    //   amd: 'lodash',
    //   root: '_',
    // },
    // lodash: 'lodash',
    'lodash/debounce': 'lodash/debounce',
    'lodash/isEqual': 'lodash/isEqual',
    'prop-types': 'prop-types',
    'react-datepicker': 'react-datepicker',
    'react-device-detect': 'react-device-detect',
    'react-transition-group': 'react-transition-group',
    'google-maps-api-loader': 'google-maps-api-loader',
    '@emotion/react': '@emotion/react',
    '@emotion/styled': '@emotion/styled',
    '@open-tender/js': '@open-tender/js',
    '@open-tender/redux': '@open-tender/redux',
  },
}
