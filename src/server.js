const http = require('http');
const express = require('express');

// Routers
const usersRoutes = require('./router/users');
const loginRoutes = require('./router/login');
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

app.get('/', function(req, res){
    res.render('index.ejs');
});

// app.get('/test2', (req, res)=>{
//     res.render('test2.ejs');
// });

app.use('/Users', usersRoutes);

app.use('/login', loginRoutes);

app.get('/test', (req, res)=>{
    db.query('SELECT * FROM member_table', (err, result) => {
        if(err) console.error(err);
        res.render('test.ejs', {data: result});
    });
});


// 간편 시작하기
// cd /d/Cansur/nodejsTest/src
// nodemon server.js