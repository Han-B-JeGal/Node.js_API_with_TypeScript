import express from 'express';
import { emitWarning } from 'process';

const router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response) => {
    res.render('index', { title: 'Express' });
});

/* router.get('/signUp', (req: express.Request, res: express.Response) => {
    res.render('signUp', { title: 'Express' });
});

router.post('/signUp', (req: express.Request, res: express.Response) => {
    res.render('signUp', { title: 'Express' });
}); */

router.route('/signUp')
    .get(function(req, res) {
        res.render('signUp'), { title: 'Express' };
    })
    .post(function(req, res) {
        res.render('signUp'), { title: 'Express' };
    });

export = router;
