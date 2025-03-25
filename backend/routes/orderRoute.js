import express from 'express';
import authMiddleware from '../middleware/auth.js'; // Fix: Changed path from middlewares to middleware
import { placeOrder } from '../controllers/orderController.js';

const orderRouder = express.Router();
orderRouder.post("/place", authMiddleware, placeOrder);

export default orderRouder;