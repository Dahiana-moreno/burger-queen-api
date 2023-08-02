import { Router } from 'express'; // router de express
import * as usersCtrl from '../controllers/users.controller';

const router = Router();

router.get('/', usersCtrl.getUsers);

router.get('/:productId', usersCtrl.getUserById);

router.post('/', usersCtrl.createUser);

router.put('/:productId', usersCtrl.updateUserById);

router.delete('/:productId', usersCtrl.deleteUserById);

export default router;
