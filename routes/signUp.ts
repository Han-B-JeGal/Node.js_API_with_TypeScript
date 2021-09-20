import express from 'express';
import { resolve } from 'path';
import connection from '../config/database';

const router = express.Router();


// SignUp API. POST method.
router.post('/Register', (req: express.Request, res: express.Response) => {
    const signUpData: any = {

    }
    const bodyParams: any = req.body;
    console.log(req.body);
    res.status(500).send({ message: 'AM I WHAT YOU EXPECTED?'});
    
})

router.post('/checkID', (req: express.Request, res: express.Response) => {

    
    res.status(200).send({ message: ' AM I WHAT YOU EXPECTED?'});
})

export = router;
