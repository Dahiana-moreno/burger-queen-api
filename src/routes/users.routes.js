import { Router } from 'express'; // router de express
import * as usersCtrl from '../controllers/users.controller';

const router = Router();

router.post('/', usersCtrl.createUser);

router.get('/', usersCtrl.getUsers);

router.get('/:usersId', usersCtrl.getUsersById);

router.patch('/:usersId', usersCtrl.updateUsersById);

router.delete('/:usersId', usersCtrl.deleteUsersById);

export default router;
