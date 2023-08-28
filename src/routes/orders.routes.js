import { Router } from 'express'; // router de express
import * as ordersCtrl from '../controllers/orders.controller';
import { verifyToken } from '../middlewares/authJwt';

const router = Router();
router.post('/', verifyToken, ordersCtrl.createOrder);

router.get('/', verifyToken, ordersCtrl.getOrders);

router.get('/:orderId', verifyToken, ordersCtrl.getcreateOrderById);

router.patch('/:orderId', verifyToken, ordersCtrl.updateOrderById);

router.delete('/:orderId', verifyToken, ordersCtrl.deleteOrderById);

export default router;
