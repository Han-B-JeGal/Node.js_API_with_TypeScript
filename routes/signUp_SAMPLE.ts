import { sign } from 'crypto';
import { resolveInclude } from 'ejs';
import express from 'express';
import { STATUS_CODES } from 'http';
import { resolve } from 'path';
import { allowedNodeEnvironmentFlags } from 'process';
import { CLIENT_RENEG_WINDOW } from 'tls';
import connection from '../config/database';
import { encrypt, decrypt } from './crypto';

const router = express.Router();





//====================================================================================================================



// SignUp API. POST method.
router.post('/Register', (req: express.Request, res: express.Response) => {
    const signUpData: any = {
        'U_ID': req.body.id,
        'U_EMAIL': req.body.email,
        'U_PW': req.body.pw, // TODO: ENCRYPT
        'U_IDX': req.body.pwCheck // TODO: ENCRYPT
    };

    
    // TODO: CHECKING DUPLICATED ID LOGIC & SIGNUP QUERY & PW IDENTICAL CHECKING LOGIC


    function checkingID() {
        connection.query('SELECT U_ID FROM REGISTERED_USER_INFO WHERE U_ID = ?', signUpData['id'],
        function (err, result) {
            // console.log(result[0].U_ID);  // USE result[0] to access RowDataPacket's Data

            if (result[0] != undefined) 
            {
                res.status(400).json( { message : 'ID Already Exists !!'});
            };
        });
    };


    function checkingEmail() {
        connection.query('SELECT U_EMAIL FROM REGISTERED_USER_INFO WHERE U_EMAIL = ?', signUpData['email'],
        function (err, result) 
        {
            console.log(result[0]); // USE result[0] to access RowDataPacket's Data
            
            if (result[0] != undefined) 
            {
                res.status(400).json( { message : 'Email Already Exists !!'});
            };
        });
    };

    function checkingNull() {
        if (req.body.id!=undefined && req.body.email!=undefined && req.body.pw!=undefined) 
        {
            checkingPW();
        }
        else
        {
            res.status(400).json( { message : 'FILL THE BLANKET!!'});
        }
    }


    function checkingPW() {
        if (signUpData['pw'].localeCompare(signUpData['pwCheck']) == 0) 
        {
            console.log("OKAY TO GO"); // TODO: write signUp Query 
            signUpQuery();
        }
        else 
        {
            res.status(400).json( { message : 'PassWord isn\'t Identical !!'});
        };
    };


    function signUpQuery() {
        if (req.body.id!=undefined && req.body.email!=undefined && req.body.pw!=undefined) 
        {
            const queryForSignUp: string = connection.query('INSERT INTO REGISTERED_USER_INFO SET ?', signUpData, 
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
}};



    checkingID();
    checkingEmail();
    checkingNull();

});



    


//====================================================================================================================



export = router;
