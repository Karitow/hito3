import { Router } from 'express';
import { createOrder, getOrder, updateOrder, deleteOrder } from '../controllers/orderController.js';
import { authToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authToken, createOrder);
router.get('/:orderId', authToken, getOrder);
router.put('/:orderId', authToken, updateOrder);
router.delete('/:orderId', authToken, deleteOrder);

export default router;
