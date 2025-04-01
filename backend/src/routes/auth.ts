import express from 'express';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Protect all routes
router.use(protect as express.RequestHandler);

export default router;