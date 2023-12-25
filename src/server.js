const express = require('express');
const db = require('../src/tmp/db');

// Routers
const usersRoutes = require('./router/users');

// express
const app = express();

// configuration =================================================================
app.listen(8080, function(){
    console.log('listening on port 8080');
});

app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html');
});

// app.get('/users', (req, res)=>{
//     res.sendFile(__dirname + '/tmp/users.html');
//     db.query('SELECT * FROM users', function(err, results, fields) {
//         if(err) console.error(err);
//         console.log(results);
//         // res.json(results);
//     });
// });

app.get('/test', (req, res)=>{
    res.sendFile(__dirname + '/tmp/test.html');
});

app.use('/Users', usersRoutes);
// 간편 시작하기
// cd /d/Cansur/nodejsTest/src
// nodemon server.js