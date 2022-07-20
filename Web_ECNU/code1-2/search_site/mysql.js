var mysql = require("mysql");
var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Shichengxin123',
    database: 'crawl',
    connectionLimit: 100,
});
var query = function (sql, sqlparam, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            // conn.release();
            callback(err, null, null);
        } else {
            conn.query(sql, sqlparam, function (qerr, vals, fields) {
                // conn.release(); //释放连接
                callback(qerr, vals, fields); //事件驱动回调 
            });
        }
        pool.releaseConnection(conn);
    });
};
var query_noparam = function (sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            callback(err, null, null);
        } else {
            conn.query(sql, function (qerr, vals, fields) {
                conn.release(); //释放连接 
                callback(qerr, vals, fields); //事件驱动回调 
            });
        }
    });
};

// var fetchSql = "select url,source_name,title,author,publish_date " +
//     "from fetches where publish_date like '%" + "2022-07-20" + "%'" + " AND title like '%" + "新冠" +"%'";
// for (let i = 1; i < 100; i++) {
//     query(fetchSql, function (err, result, fields) {
//         // response.writeHead(200, {
//         //     "Content-Type": "application/json"
//         console.log(JSON.stringify(result));
//         console.log(fetchSql);
//
//     });
// }
exports.query = query;
exports.query_noparam = query_noparam;