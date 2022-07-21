var express = require('express');
var router = express.Router();
var mysql = require('../mysql.js');
var echartsWordCloud = require('../echartsWordCloud.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/wordCloudJieba_get', function(request, response) {
    var fetchSql = "select url,source_name,title,author,publish_date " +
        "from fetches where title like '%" + request.query.title + "%'"
        + " AND " + "source_name like '%" + request.query.source_name + "%'";
    console.log(fetchSql);
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(echartsWordCloud.getData(JSON.stringify(result)));
        response.end();

    });


    // response.write(JSON.stringify(echartsWordCloud.getData()));
    // response.end();
    // console.log("fetchSql  " + JSON.stringify(fetchSql));
    // console.log("result " + JSON.stringify(result));
    // console.log("err" + err);
});
router.get('/process_get', function(request, response) {
  //sql字符串和参数
  var fetchSql = "select url,source_name,title,keywords,author,publish_date " +
      "from fetches where title like '%" + request.query.title + "%'"
      + " AND " + "source_name like '%" + request.query.source_name + "%'";
  console.log(fetchSql);
  mysql.query(fetchSql, function(err, result, fields) {
    response.writeHead(200, {
      "Content-Type": "application/json"
    });
    response.write(JSON.stringify(result));
    response.end();
    // console.log("fetchSql  " + JSON.stringify(fetchSql));
    // console.log("result " + JSON.stringify(result));
    // console.log("err" + err);
  });
});
module.exports = router;