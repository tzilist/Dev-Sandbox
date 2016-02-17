const path = require('path');
const webpack = require('webpack');

module.exports = {
 entry: './client/react/main.jsx',
 output: {
   path: path.join(__dirname, 'build'),
   publicPath: '/assets/',
   filename: 'bundle.js'
 },
 plugins: [
   new webpack.HotModuleReplacementPlugin()
 ],
 devtool: 'source-map',
 module: {
   loaders: [
     {
       test: /.jsx?$/,
       loader: 'babel-loader',
       exclude: /node_modules/,
       query: {
         presets: ['es2015', 'react']
       }
     }
   ]
 }
};
