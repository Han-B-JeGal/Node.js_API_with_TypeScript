import mysql from 'mysql';
import { router } from '../app';


const connection: any = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'test',
    multipleStatements: true
});

connection.connect(function (err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

export = connection;

/* DB DDL
CREATE TABLE `tbl_user` (
    `u_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'pk',
    `u_email` varchar(320) NOT NULL COMMENT '유저 이메일',
    `u_nm` varchar(20) NOT NULL COMMENT '유저 이름',
    `u_pwd` varchar(200) NOT NULL COMMENT '유저 비밀번호',
    `u_mobile_no` varchar(15) DEFAULT NULL COMMENT '연락처',
    `reg_dt` datetime NOT NULL,
    `mod_dt` datetime DEFAULT NULL,
    `last_login_dt` datetime DEFAULT NULL COMMENT '최근 로그인 일시',
    PRIMARY KEY (`u_id`),
    UNIQUE KEY `u_email` (`u_email`)
  ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='유저'
 */