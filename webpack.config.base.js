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
    '@emotion/react': '@emotion/react',
    '@emotion/styled': '@emotion/styled',
    '@open-tender/js': '@open-tender/js',
    '@open-tender/redux': '@open-tender/redux',
    'lodash/debounce': 'lodash/debounce',
    'lodash/isEqual': 'lodash/isEqual',
    'prop-types': 'prop-types',
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
    'react-transition-group': 'react-transition-group',
  },
}
