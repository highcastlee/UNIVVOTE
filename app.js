const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
// ./models는 ./models/index.js와 같은 의미
const {sequelize}= require('./models');

const indexRouter = require('./routes/index');
// const voteRouter = require('./routes/vote');




dotenv.config();

const app = express();
app.set('port',process.env.PORT || 3007);
app.set('view engine','html');

nunjucks.configure('views',{
    express:app,
    watch:true,
});
sequelize.sync({force:false})
    .then(()=>{
        console.log('DB연결 성공');
    })
    .catch((err)=>{
        console.log(err);
    });


app.use(morgan('dev'));
app.use('/',express.static(path.join(__dirname,'node')));

//public 폴더의 정적 파일 제공
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(favicon(path.join(__dirname, 'public','image', 'favicon9.ico')));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false
    },
    name:'session-cookie'
}));


app.use('/',indexRouter);
// app.use('/vote',voteRouter);


// app.use((req,res,next)=>{
//     console.log('모든 요청에 실행되는 미들웨어');
//     console.log(req.method+req.url);
//     next();
// });
// app.get('/',(req,res,next)=>{
//     console.log('get 실행됨');
//     res.render('index');
//     next();
// });

app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    console.log('에러메시지'+err.message);
    res.locals.error = process.env.NODE_ENV !== 'production' ? err: {};
    res.status(err.status || 500);
    //res.render('index',{title:'hey'})하면 title:'hey' 값을 넘겨주면서 index.html파일이 렌더링됨!!
    res.render('error');
});
app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');

});
