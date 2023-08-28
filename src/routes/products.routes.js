import { Router } from 'express'; // router de express
import * as productsCtrl from '../controllers/products.controller';
import { verifyToken } from '../middlewares';

const router = Router();
router.post('/', verifyToken, productsCtrl.createProduct);
router.get('/', productsCtrl.getProducts);
router.get('/:productId', productsCtrl.getProductById);
router.patch('/:productId', verifyToken, productsCtrl.updateProductById);
router.delete('/:productId', verifyToken, productsCtrl.deleteProductById);

export default router;
