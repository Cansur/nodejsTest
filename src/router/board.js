const express = require('express');
const router = express.Router();
const db = require('./db');
// const url = require('url');

// Body-parser for express
router.use(express.json()); 
router.use(express.urlencoded({ extended: false }));


router.get('/', function (req, res) {
    var search = req.query.search;
    // 페이징 처리
    var countPerPage = req.query.countperpage;
    var pageNo = req.query.pageno;
    var pagePre = 0;
    // 기본값 설정 및 전달 내용 확인
    if (countPerPage == undefined || typeof countPerPage == "undefined" || countPerPage == null) {countPerPage = 10;}
	else { countPerPage = parseInt(countPerPage); }
	if (pageNo == undefined || typeof pageNo == "undefined" || pageNo == null) { pageNo = 1; } 
    else { pageNo = parseInt(pageNo); }
    if (search == undefined || typeof search == "undefined" || search == null) { search = ""; } 
    // else { search = search; }

    // PageNo 에 따라 분할
    if(search == "") { sql = `select count(*) as 'number' from board`; }
    else { sql = `select count(case when title like "%${search}%" then 1 end) as 'number' from board`;}
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        
        if (pageNo > 0) {
            var totalCount = result[0].number; // 전체 크기
            var startItemNo = ((pageNo-1) * countPerPage); // 시작 번호
            var endItemNo = (pageNo * countPerPage); // 종료 번호
            // 종료 번호가 전체 크기보다 크면 전체 크기로 변경
            if (endItemNo > (totalCount - 1)) { endItemNo = totalCount; }
            // console.log(Math.floor(pageNo/5))
            pagePre = Math.floor((pageNo-1)/5) // 페이지 1, 6, 11 .... 간격 지정
            var data2 = [totalCount, pageNo, pagePre, search]; // 변수 츄라이 츄라이
            // console.log(totalCount, endItemNo); //
            if(search == "") { sql = `select * from board order by seq desc limit ${startItemNo}, ${endItemNo - startItemNo}`; }
            else { sql = `select * from board where title like "%${search}%" order by seq desc limit ${startItemNo}, ${endItemNo - startItemNo}`;} 
            db.query(sql, function (err, result, fields) {
                if (err) throw err;
                res.render('board.ejs', {data : result, data2 : data2});
            });
        } 
    });
});

router.post(`/`, function (req, res) {
    var search = req.body.search // 검색 변수
    // 페이징 처리
    var countPerPage = req.query.countperpage;
    var pageNo = req.query.pageno;
    var pagePre = 0;
    // 기본값 설정 및 전달 내용 확인
    if (countPerPage == undefined || typeof countPerPage == "undefined" || countPerPage == null) {countPerPage = 10;}
	else { countPerPage = parseInt(countPerPage); }
	if (pageNo == undefined || typeof pageNo == "undefined" || pageNo == null) { pageNo = 1; } 
    else { pageNo = parseInt(pageNo); }

    // PageNo 에 따라 분할
    sql = `select count(case when title like "%${search}%" then 1 end) as 'number' from board`
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        
        if (pageNo > 0) {
            var totalCount = result[0].number; // 전체 크기
            var startItemNo = ((pageNo-1) * countPerPage); // 시작 번호
            var endItemNo = (pageNo * countPerPage); // 종료 번호
            // 종료 번호가 전체 크기보다 크면 전체 크기로 변경
            if (endItemNo > (totalCount - 1)) { endItemNo = totalCount; }
            pagePre = Math.floor((pageNo-1)/5) // 페이지 1, 6, 11 .... 간격 지정
            var data2 = [totalCount, pageNo, pagePre, search]; // 변수 츄라이 츄라이

            if(totalCount == 0) { 
                res.render('board.ejs', {data : result, data2 : data2});
            }
            else{
            sql = `select * from board where title like "%${search}%" order by seq desc limit ${startItemNo}, ${endItemNo - startItemNo}`;
            db.query(sql, function (err, result, fields) {
                if (err) throw err;
                res.render('board.ejs', {data : result, data2 : data2});
            });
        }
        } 
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

router.get(`/view/:idx/edit`, function (req, res) {
    var idx = req.params.idx;
    var sql = `select * from board where seq = ${idx}`;
    db.query(sql, function (err, result, fields) {
        res.render('edit.ejs', { data : result});
    });
});

router.post(`/view/:idx/edit`, function (req, res) {
    var idx = req.params.idx;
    var title = req.body.title;
    var content = req.body.content;
    var sql = `update board set title='${title}', contents='${content}' where seq = '${idx}'`;
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        // res.render('edit.ejs', { data : result});
    });
    return res.redirect(`/board/view/${idx}`);
});

router.get(`/write`, function (req, res) {
    res.render('write.ejs');
});

router.post("/write", function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    if(title == ""){ return res.redirect("../board")}
    var sql = `insert into board(title, contents, user_id, likes) values('${title}', '${content}', 'cansur', 0)`
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
    });
    return res.redirect("../board")
});

module.exports = router;