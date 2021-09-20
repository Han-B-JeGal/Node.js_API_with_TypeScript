import express from 'express';
import { resolve } from 'path';
import connection from '../config/database';

const router = express.Router();


// SignUp API. POST method.
router.post('/Register', (req: express.Request, res: express.Response) => {
    const signUpData: any = {
        'id': req.body.id,
        'pw': req.body.pw,
        'pwCheck': req.body.pwCheck
    }
    console.log(req);

    res.status(200).send({ message: 'AM I WHAT YOU EXPECTED?'});
    
})

router.post('/checkID', (req: express.Request, res: express.Response) => {

    
    res.status(200).send({ message: ' AM I WHAT YOU EXPECTED?'});
})

export = router;
