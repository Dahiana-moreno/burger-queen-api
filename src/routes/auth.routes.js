import { Router } from 'express'; // router de express
import * as authCtrl from '../controllers/auth.controller';

const router = Router();

router.post('/', authCtrl.login);

router.get('/', authCtrl.isAdmin);

export default router;
