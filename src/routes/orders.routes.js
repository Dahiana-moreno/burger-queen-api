import { Router } from 'express'; // router de express
import * as ordersCtrl from '../controllers/orders.controller';

const router = Router();
router.post('/', ordersCtrl.createOrder);

router.get('/', ordersCtrl.getOrders);

router.get('/:orderId', ordersCtrl.getcreateOrderById);

router.patch('/:orderId', ordersCtrl.updateOrderById);

router.delete('/:orderId', ordersCtrl.deleteOrderById);

export default router;
