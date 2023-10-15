const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        filename: './src/index.ts',
        path: path.resolve(__dirname, 'src/index.ts')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts','.js'],
    },
    output: {
        filename: 'bundle.js',
        path : path.resolve(__dirname, 'public'),
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};