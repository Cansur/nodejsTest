const express = require('express');
const fs = require('fs');

// Routers
const usersRoutes = require('./router/users');
const db = require('./router/db');

// express
const app = express();

// ejs
app.set('view engine', 'ejs');

// configuration =================================================================
app.listen(8080, function(){
    console.log('listening on port 8080');
});

app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html');
});

app.get('/test', (req, res)=>{
    res.sendFile(__dirname + '/tmp/test.html');
});

app.use('/Users', usersRoutes);

// const listPage = fs.readFileSync('list.ejs', 'utf8');
app.get('/list', (req, res)=>{
    db.query('SELECT * FROM users', (err, result) => {
        if(err) console.error(err);
        // console.log(result);
        res.render('test.ejs', {data: result});
    });
});


// 간편 시작하기
// cd /d/Cansur/nodejsTest/src
// nodemon server.js