const http = require('http');
const express = require('express');

// Routers
const indexRoutes = require('./router/index');
const usersRoutes = require('./router/users');
const loginRoutes = require('./router/login');
const boardRoutes = require('./router/board');
const db = require('./router/db');

// express
const app = express();
const server = http.createServer(app);

// ejs
app.set('view engine', 'ejs');

// configuration =================================================================
server.listen(8080, function(){
    console.log('listening on port 8080');
});

app.use('/', indexRoutes);

app.use('/Users', usersRoutes);

app.use('/login', loginRoutes);

app.use('/board', boardRoutes);

// 간편 시작하기
// cd /d/Cansur/nodejsTest/src
// nodemon server.js