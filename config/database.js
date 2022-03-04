const mysql = require('mysql2/promise');
require('dotenv').config();

// module.exports.DATABASE = mysql.createPool({
//     "host": "localhost",
//     "user": "root",
//     "password": "root",
//     "database": "nigger84_bmgmysql2022",
//     "port": "8889"
// });
// module.exports.DATABASE = mysql.createPool({
//     "host": "mysql1007.mochahost.com",
//     "user": "nigger84_bmg2022",
//     "password": "QZf7b)PMe@;6",
//     "database": "nigger84_bmgmysql2022",
//     "port": "3306"
// });
module.exports.DATABASE = mysql.createPool({
    "host": "us-cdbr-east-05.cleardb.net",
    "user": "bf67e6da4810eb",
    "password": "44fc425d",
    "database": "heroku_195f897dd741e64	",
    "port": "3306"
});
