const path = require('path');
module.exports = {
    mode:"production",
    entry:"./public/main.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:'[name].js'
    },
    module: {
        rules: [
          {
            // .js 확장자를 가진 파일에 대해 적용
            test: /\.js$/,
            // node_modules 폴더 제외
            exclude: /(node_modules)/,
            use: {
              // babel-loader 사용
              loader: 'babel-loader',
            }
          },
          {
            test: /\.css$/,
            use:[
                'style-loader',
                'css-loader',
            ],
            },
        ]
    },
};