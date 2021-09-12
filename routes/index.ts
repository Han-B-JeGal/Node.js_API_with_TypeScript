import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response) => {
    res.render('index', { title: 'Express' });
});

router.get('/signUp', (req: express.Request, res: express.Response) => {
    res.render('signUp', { title: 'Express' });
});

export = router;
