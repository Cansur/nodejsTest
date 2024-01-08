const express = require('express');
const router = express.Router();
const db = require('./db');
// const url = require('url');

// Body-parser for express
router.use(express.json()); 
router.use(express.urlencoded({ extended: false }));


router.get('/', function (req, res) {
    sql = `select * from board order by seq desc`
    db.query(sql, function (err, result, fields) {
        // datas = result;
        // console.log(result.length);
        res.render('board.ejs', { data : result });
    });
});

router.get(`/view/:idx`, function (req, res) {
    var idx = req.params.idx;
    var sql = `select * from board where seq = ${idx}`;
    var sql2 = `UPDATE board SET likes = likes + 1 where seq = ${idx}`;
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        result[0].contents = result[0].contents.replace(/(?:\r\n|\r|\n)/g, "<br />");
        res.render('boardView.ejs', { data : result});
    });
    db.query(sql2, function (err, result, fields) {
        if (err) throw err;
    });
});

router.get(`/view/:idx/delete`, function (req, res) {
    var idx = req.params.idx;
    var sql = `delete from board where seq = ${idx}`;
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        
    });

    return res.redirect("../../")
});

router.get(`/write`, function (req, res) {
    res.render('write.ejs');
});

router.get(`/edit`, function (req, res) {
    res.render('edit.ejs');
});

router.post("/write", function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var sql = `insert into board(title, contents, user_id, likes) values('${title}', '${content}', 'cansur', 0)`
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
    });
    return res.redirect("../board")
});

module.exports = router;