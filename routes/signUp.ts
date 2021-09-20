import express from 'express';
import { resolve } from 'path';
import connection from '../config/database';
import { encrypt, decrypt } from './crypto';

const router = express.Router();


// SignUp API. POST method.
router.post('/Register', (req: express.Request, res: express.Response) => {
    const signUpData: any = {
        'id': req.body.id,
        'pw': req.body.pw, // TODO: ENCRYPT
        'pwCheck': req.body.pwCheck // TODO: ENCRYPT
    }

    // TODO: ID DUPLICATE CHECKING LOGIC & SIGNUP QUERY & PW IDENTICAL CHECKING LOGIC
    console.log(signUpData);
    
    res.status(200).send({ message: 'AM I WHAT YOU EXPECTED?'});
    
})

router.post('/checkID', (req: express.Request, res: express.Response) => {

    
    res.status(200).send({ message: ' AM I WHAT YOU EXPECTED?'});
})

export = router;
