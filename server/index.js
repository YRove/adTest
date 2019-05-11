// node 后端服务器

const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token,adminid");
    res.header("Access-Control-Expose-Headers", "*");
    //如果需要使用put和delete需要对OPTION返回响应
    if(req.method=='OPTIONS'){
        res.send('');
        return;
    }
    next();
});

// 后端api路由
app.use('/api', userApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');