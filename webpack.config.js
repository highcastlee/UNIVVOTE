const path = require('path');
module.exports = {
    mode:"development",
    entry:"./public/main.js",
    output:{
        path:path.resolve(__dirname,"public"),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                ],
            },
        ],
    },
};