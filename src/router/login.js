const express = require('express');
const router = express.Router();
const db = require('./db');

// Body-parser for express
router.use(express.json()); 
router.use(express.urlencoded({ extended: false }));

router.get('/', function (req, res) {
    db.query('SELECT * FROM member_table', function(err, results, fields) {
        if(err) console.error(err);
        // console.log(results);
        res.render('login', {data: results});
    });
});

router.post('/', (req, res) => {
    const id = req.body.id;
    db.query('select * from users', function(err, results, fields) {
        for(i = 0; i < results.length; i++){
            if(results[i].id == id){
                console.log(results[i].password);
                break;
            }
        }
    });
});

module.exports = router;