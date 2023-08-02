import { Router } from 'express'; // router de express
import * as ordersCtrl from '../controllers/orders.controller';

const router = Router();

router.get('/', ordersCtrl.getOrders);

router.get('/:productId', ordersCtrl.getcreateOrderById);

router.post('/', ordersCtrl.createOrder);

router.put('/:productId', ordersCtrl.updateOrderById);

router.delete('/:productId', ordersCtrl.deleteOrderById);

export default router;
