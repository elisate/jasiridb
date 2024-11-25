const path = require('path');
const webpack = require('webpack');
const CURRENT_WORKING_DIR = process.cwd();

const config = {
    name: "server",
    mode: "development", // Change this to production for production builds
    devtool: 'eval-source-map', // Or 'source-map' for production
    entry: path.join(CURRENT_WORKING_DIR, 'src/server.js'),  // Your main server file
    output: {
        path: path.join(CURRENT_WORKING_DIR, 'dist'),
        filename: 'server.bundle.js',  // Output file for server bundle
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()  // Optional: Only emit files when there are no errors
    ],
    resolve: {
        fallback: {
            "fs": false,  // Ignore fs module
            "url": require.resolve("url/"),
            "crypto": require.resolve("crypto-browserify"),
            "path": require.resolve("path-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/"),
            "os": require.resolve("os-browserify/browser"),
            "http": require.resolve("stream-http"),
            "net": require.resolve("net-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "assert": require.resolve("assert/"),
            "vm": require.resolve('vm-browserify'),
            // Add any other necessary polyfills here
        },
    }
};

module.exports = config;
