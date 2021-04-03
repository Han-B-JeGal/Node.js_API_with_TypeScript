import express from 'express';
import connection from '../config/database';
const router = express.Router();


/* 조회 API GET method */
router.get('/', (req: express.Request, res: express.Response) => {
    res.send('respond with a resource');
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
    const query: string = connection.query('INSERT INTO tbl_user set ?', signupData, 
    function (err, result) {
        if (err) {
            console.error(err);
            if (err['errno'] == 1062) {
                console.log("UNIQUE KEY Duplicate ERROR");
                res.status(422).send({ error: '422', message: 'this error is UNIQUE KEY Duplicate ERROR'});
            }
            throw err;
        }
        res.status(200).send('success');
    });
});








export = router;
