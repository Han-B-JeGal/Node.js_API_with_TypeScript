import express from 'express';
import { renameSync } from 'node:fs';
import connection from '../config/database';
const router = express.Router();

// 조회 API GET method
router.get('/show/:u_id', (req: express.Request, res: express.Response) => {
    const u_id: number = parseInt(req.params.u_id, 10);
    if (!u_id) {    // u_id가 number 타입이 아닐 경우 대비한 if문 *parseInt() 리턴값이 NaN이면 u_id에 NaN이 들어가기때문
        res.status(400).json({ error: '400', message: 'incorrect u_id'});
    }
    else {
        const queryForShow: string = connection.query('SELECT reg_dt FROM tbl_user WHERE u_id = ?', u_id,
        function (err, result) {
            if (result[0]===undefined) {    // result가 undefined면 값이 없는 것이므로 400에러 뱉는다
                res.status(400).send({ error: '400', message: 'empty result' });
            }
            else {
                res.status(200).json(result);
            }
       });
    }
});

// 회원가입 API POST method
router.post('/signup', (req: express.Request, res: express.Response) => {
    const signupData: any = {
        'u_id': req.body.u_id,
        'u_email': req.body.u_email,
        'u_nm': req.body.u_nm,
        'u_pwd': req.body.u_pwd,    // TODO : Encryption
        'u_mobile_no': req.body.u_mobile_no,  // TODO : Encryption
        'reg_dt': req.body.reg_dt,
        'mod_dt': req.body.mod_dt,
        'last_login_dt': req.body.last_login_dt
    };
    const queryForSignup: string = connection.query('INSERT INTO tbl_user set ?', signupData, 
    function (err, result) {
        console.log(err);
        if (err===null) {
            res.status(200).json({ message: 'success !!' });
        } 
        else {
            res.status(400).json({ error: err['errno'], message: err['sqlMessage'] });
            throw err;
        }
    });
});








export = router;
