const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules\/(?!vtv|@resources)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    chrome: 80,
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              'styled-jsx/babel',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: path.resolve('node_modules/react'),
      'react-dom': path.resolve('node_modules/react-dom'),
      '@fortawesome/fontawesome-svg-core': path.resolve(
        'node_modules/@fortawesome/fontawesome-svg-core'
      ),
    },
  },
  output: {
    path: path.resolve(__dirname, '..', '..', 'renderer'),
    filename: 'bundle.js',
  },
}
