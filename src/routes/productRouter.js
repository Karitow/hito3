import { Router} from 'express';
import * as productControllers from '../controllers/productController.js'

const router = Router();

router.get('/products', productControllers);
router.post('/products', productControllers);
router.put('/products/:id', productControllers);
router.delete('products/:id', productControllers);

export default router;