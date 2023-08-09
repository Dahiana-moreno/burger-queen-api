import { Router } from 'express'; // router de express
import * as authCtrl from '../controllers/auth.controller';

const router = Router();

router.post('/', authCtrl.signUp);

// router.post('/signin', authCtrl.signIn);

export default router;
