import { Router } from 'express'; // router de express
import * as usersCtrl from '../controllers/users.controller';

const router = Router();

router.post('/', usersCtrl.createUser);

router.get('/', usersCtrl.getUsers);

// router.get('/:usersId', usersCtrl.getUserById);

// router.put('/:usersId', usersCtrl.updateUserById);

// router.delete('/:usersId', usersCtrl.deleteUserById);

export default router;
