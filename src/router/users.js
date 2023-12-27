const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', function (req, res) {
    db.query('SELECT * FROM member_table', function(err, results, fields) {
        if(err) console.error(err);
        // console.log(results);
        res.render('users', {data: results});
    });
    
});

module.exports = router;