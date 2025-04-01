import express from 'express';
import { getDesignNews } from '../controllers/newsController';

const router = express.Router();

// Get design news
router.get('/', getDesignNews as express.RequestHandler);

export default router;