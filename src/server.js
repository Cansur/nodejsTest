const http = require('http');
const express = require('express');

// Routers
const usersRoutes = require('./router/users');
const db = require('./router/db');

// express
const app = express();
const server = http.createServer(app);

// ejs
app.set('view engine', 'ejs');
// app.set('view', './views');

// configuration =================================================================
server.listen(8080, function(){
    console.log('listening on port 8080');
});

app.get('/', function(req, res){
    // res.sendFile(__dirname + '/index.html');
    res.render('index.ejs');
});

app.get('/test2', (req, res)=>{
    // res.sendFile(__dirname + '/tmp/test.html');
    res.render('test2.ejs');
});

app.use('/Users', usersRoutes);

// const listPage = fs.readFileSync('list.ejs', 'utf8');
app.get('/test', (req, res)=>{
    db.query('SELECT * FROM users', (err, result) => {
        if(err) console.error(err);
        // console.log(result);
        res.render('test.ejs', {data: result});
    });
});


// 간편 시작하기
// cd /d/Cansur/nodejsTest/src
// nodemon server.js