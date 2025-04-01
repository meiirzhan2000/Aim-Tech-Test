import express from 'express';
import {
  getUserProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Protect all routes
router.use(protect as express.RequestHandler);

// Get all products & create new product
router.route('/')
  .get(getUserProducts as express.RequestHandler)
  .post(createProduct as express.RequestHandler);

// Get, update, & delete single product
router.route('/:id')
  .get(getProduct as express.RequestHandler)
  .patch(updateProduct as express.RequestHandler)
  .delete(deleteProduct as express.RequestHandler);

export default router;