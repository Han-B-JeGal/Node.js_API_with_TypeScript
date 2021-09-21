import { sign } from 'crypto';
import { resolveInclude } from 'ejs';
import express from 'express';
import { STATUS_CODES } from 'http';
import { resolve } from 'path';
import connection from '../config/database';
import { encrypt, decrypt } from './crypto';

const router = express.Router();



//====================================================================================================================



// SignUp API. POST method.
router.post('/Register', (req: express.Request, res: express.Response) => {
    const signUpData: any = {
        'id': req.body.id,
        'email': req.body.email,
        'pw': req.body.pw, // TODO: ENCRYPT
        'pwCheck': req.body.pwCheck // TODO: ENCRYPT
    };
    
    // TODO: CHECKING DUPLICATED ID LOGIC & SIGNUP QUERY & PW IDENTICAL CHECKING LOGIC

    const checkingID: string = connection.query('SELECT U_ID FROM REGISTERED_USER_INFO WHERE U_ID = ?', signUpData['id'], 
    function (err, result) {
        console.log(result);
        if (result.length > 0){
            return res.status(400).json({ message: 'ID already exits'});
        }

    

        const checkingEmail: string = connection.query('SELECT U_EMAIL FROM REGISTERED_USER_INFO WHERE U_EMAIL = ?', signUpData['email'], 
        function (err, result) {
            console.log(result);
            if (result.length > 0){
                return res.status(400).json({ message: 'EMAIL already exits'});
            }
        });

        // console.log(signUpData['pw'].localeCompare(signUpData['pwCheck']) == 0);

        const checkingPW: Function = function() {
            // if localeCompare() returns '0' THEN BOTH ARE EXACT  
            if (signUpData['pw'].localeCompare(signUpData['pwCheck']) == 0) {
                console.log("OKAY TO GO"); // TODO: write signUp Query 
            }
            else {
                res.status(400).json({ message: 'PassWord isn\'t Identical'});
            };
            
        };

        checkingPW();
        
        
        

    });

});


    // const checkingEmail: string = connection.query('SELECT U_EMAIL FROM REGISTERED_USER_INFO WHERE U_EMAIL = ?', signUpData['email'], 
    // function (err, result) {
    //     console.log("this is result");
    //     console.log(result);
    //     if (err===null){
    //     }
    //     else {
    //         res.status(400).json({ message: 'EMAIL already exits'});
    //     };

    // });




    // if (signUpData['pw'] === signUpData['pwCheck']) {
    //     res.status(200).json({ message: 'DONE'});
    // }
    // else {
    //     res.status(400).json({ message: 'Password isn\'t identical'});
    // };




    // if (!signUpData['pw']==signUpData['pwCheck']) {
    //     res.status(400).json({ message: 'Password isn\'t identical'});
    // }

    // CHECKING DUPLICATE ID & EMAIL => IF OK THEN SIGNUP


    


//====================================================================================================================



export = router;
