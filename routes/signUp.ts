import express from 'express';
import connection from '../config/database';
const router = express.Router();



// SignUp API. POST method.
router.post('/Register', (req: express.Request, res: express.Response) => {
    const signUpData: any = {

    }
    res.status(500).send({ message: 'AM I WHAT YOU EXPECTED?'});
    
})


export = router;
