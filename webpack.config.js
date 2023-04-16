const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /.(c|sa|sc)ss$/, //匹配 css、sass、scss 文件
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true
            }
          }
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './public/index.html'
    })
  ]
}

