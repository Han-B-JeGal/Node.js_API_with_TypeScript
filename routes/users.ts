import express from 'express';
import { renameSync } from 'node:fs';
import connection from '../config/database';
const router = express.Router();



// 회원가입 API POST method
router.post('/signup', (req: express.Request, res: express.Response) => {
    const signupData: any = {
        'u_id': req.body.u_id,
        'u_email': req.body.u_email,
        'u_nm': req.body.u_nm,
        'u_pwd': req.body.u_pwd,    // TODO : Encryption
        'u_mobile_no': req.body.u_mobile_no,  // TODO : Encryption
        'reg_dt': req['_startTime'],
        'mod_dt': req.body.mod_dt,
        'last_login_dt': req.body.last_login_dt
    };

    const queryForSignup: string = connection.query('INSERT INTO tbl_user SET ?', signupData, 
    function (err, result) {
        if (err===null) {
            console.log(req);
            res.status(200).json({ message: 'sign up success !!' });
        } 
        else {
            console.log(err);
            res.status(400).json({ error: err['errno'], message: err['sqlMessage'] });
        }
    });
});



// 조회 API GET method
router.get('/:u_id/show', (req: express.Request, res: express.Response) => {
    const u_id: number = parseInt(req.params.u_id, 10);

    if (!u_id) {    // u_id의 자료형이 number가 아닐 경우 대비한 if문 !  parseInt()의 리턴값이 NaN이면 u_id에 NaN이 들어가기때문
        res.status(400).json({ error: '400', message: 'this is not number'});
    }
    else {
        const queryForShow: string = connection.query('SELECT reg_dt FROM tbl_user WHERE u_id = ?', u_id,
        function (err, result) {
            if (result[0]===undefined) {    // result가 undefined면 값이 없는 것이므로 400에러 뱉는다
                res.status(400).send({ error: '400', message: 'empty result' });
            }
            else {
                console.log(result);
                res.status(200).json(result);
            }
       });
    }
});



// 정보수정 API PUT method u_nm u_pwd u_mobile_no 
router.put('/:u_id/modify', (req: express.Request, res: express.Response) => {
    const u_id: number = parseInt(req.params.u_id, 10);

    const modifyData: any = {
        'u_nm': req.body.u_nm,
        'u_pwd': req.body.u_pwd,
        'u_mobile_no': req.body.u_mobile_no,
        'mod_dt': req['_startTime']
    };

    const queryForModify: string = connection.query('UPDATE tbl_user SET ? WHERE u_id = ?', [modifyData, u_id],
    function (err, result) {
        if (result.changedRows===1) {   // 변경된 row가 있다면 수정 성공
            res.status(200).json({ message: 'modify success !!'});
        }
        else {
            console.log(result);
            res.status(400).send({ message: 'something went wrong' });
        }
    });
});



// 삭제 API DELETE method 
router.delete('/:u_id/delete', (req: express.Request, res: express.Response) => {
    const u_id: number = parseInt(req.params.u_id, 10);

    const queryForDelete: string = connection.query('DELETE FROM tbl_user WHERE u_id = ?', u_id, 
    function (err, result) {
        console.log(result);
        if (result.affectedRows===1) { // 변경된 row가 있다면 삭제 성공
            res.status(200).json({ message: 'delete success !!' });
        }
        else {
            console.log(err);
            console.log(req);
            res.status(400).send({ message: 'something went wrong' });
        }
    });
});



// 로그인 API POST method
router.post('/login', (req: express.Request, res: express.Response) => {
    const logInData: any = {
        'u_email': req.body.u_email,
        'u_pwd': req.body.u_pwd
    };


})


export = router;
