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
        'pwCheck': req.body.pwCheck // TODO: ENCRYPT
    };

    const initialAlert: Function = function() {
        console.log("resolve call");
    }
    
    const ExistingIdAlert: Function = function() {
        res.status(400).json( { message : 'ID Already Exists !!'});
    }
    
    const ExistingEmailAlert: Function = function() {
        res.status(400).json( { message : 'Email Already Exists !!'});
    }    
    
    const IdenticalPasswordAlert: Function = function() {
        res.status(400).json( { message : 'PassWord isn\'t Identical !!'});
    }
    
    // TODO: CHECKING DUPLICATED ID LOGIC & SIGNUP QUERY & PW IDENTICAL CHECKING LOGIC



    new Promise((resolve, reject) => {
        console.log("SignUp Initiated");
        resolve(initialAlert());
    })
    .then(() => {
        checkingID();
    })
    .catch(ExistingIdAlert())

    new Promise((resolve, reject) => {
        console.log("SignUp Initiated");
        resolve(initialAlert());
    })
    .then(() => {
        checkingEmail();
    })
    .catch(ExistingEmailAlert())

    new Promise((resolve, reject) => {
        console.log("SignUp Initiated");
        resolve(initialAlert());
    })
    .then(() => {
        checkingPW();
    })
    .catch(IdenticalPasswordAlert());




    function checkingID() {
        const ResultOfCheckingID:string = connection.query('SELECT U_ID FROM REGISTERED_USER_INFO WHERE U_ID = ?', signUpData['U_ID'],
        function (err, result) {
            // console.log(result[0].U_ID);  // USE result[0] to access RowDataPacket's Data

            if (result[0] != undefined) {
                throw new Error('ID Already Exists !!');
            };
        });
    };


    function checkingEmail() {
        connection.query('SELECT U_EMAIL FROM REGISTERED_USER_INFO WHERE U_EMAIL = ?', signUpData['U_EMAIL'],
        function (err, result) {
            console.log(result[0]); // USE result[0] to access RowDataPacket's Data
            if (result[0] != undefined) {
                throw new Error('EMail Already Exists !!');
            };
        });
    };


    function checkingPW() {
        if (signUpData['U_PW'].localeCompare(signUpData['pwCheck']) == 0) {
            console.log("OKAY TO GO"); // TODO: write signUp Query 
        }
        else {
            throw new Error('PassWord isn\'t Identical !!');
        };
    };





});



    


//====================================================================================================================



export = router;
