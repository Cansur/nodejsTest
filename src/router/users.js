const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('./db');

router.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, '../tmp/users.html'));
    res.render('users');
    // res.sendFile(__dirname + '../tmp/users.html'); 요놈은 안됨
    db.query('SELECT * FROM users', function(err, results, fields) {
        if(err) console.error(err);
        console.log(results);
        // res.json(results);
    });
});

module.exports = router;