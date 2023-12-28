const express = require('express');
const router = express.Router();
const db = require('./db');

// Body-parser for express
router.use(express.json()); 
router.use(express.urlencoded({ extended: false }));

router.get('/', function (req, res) {
    // db.query('SELECT * FROM member_table', function(err, results, fields) {
    //     if(err) console.error(err);
    //     // console.log(results);
    //     res.render('login', {data: results});
    // });
    res.render('login');
});

router.post('/', (req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    db.query('select * from users', function(err, results, fields) {
        let bool = Boolean(false);
        for(i = 0; i < results.length; i++){
            if(results[i].id == id){
                if(results[i].password == password){
                    console.log('로그인 완료');
                    bool = true;
                    break;
                }
            }
        }
        if(bool == false)   console.log('아니잖아!!');
    });
    // db.query(sql, function(err, result, fields) {
    //     if(err) throw err;
    //     console.log(result[0]);
    // });
});

module.exports = router;