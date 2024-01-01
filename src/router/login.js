const express = require('express');
const router = express.Router();
const db = require('./db');

// Body-parser for express
router.use(express.json()); 
router.use(express.urlencoded({ extended: false }));
let bool = 0;

router.get('/', function (req, res) {
    res.render('login', {data: bool});
});

router.post('/', (req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    bool = 0;
    db.query('select * from member_table', function(err, results, fields) {
        for(i = 0; i < results.length; i++){
            if(results[i].mb_id == id){
                if(results[i].mb_pw == password){
                    console.log('로그인 완료');
                    bool = 2;
                    res.render('login', {data : bool});
                    break;
                }
            }
        }
        if(bool == 0){ 
            bool = 1;
            res.render('login', {data : bool});
        }
    });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', (req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    let repassword = req.body.repassword;
    if(repassword != password){ console.log("다름"); return;}
    // insert into member_table(mb_id, mb_pw) values('이선재', '이선재123456');
    var sql= `insert into member_table(mb_id, mb_pw) values('${id}', '${password}')`;
    console.log(sql);
    db.query(sql, function(err, results, fields) {
        if(err) throw err;
        console.log("확인");
    });
});

module.exports = router;