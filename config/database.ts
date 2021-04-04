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