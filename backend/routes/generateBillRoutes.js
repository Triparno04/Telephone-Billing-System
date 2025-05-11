import express from 'express';
import { generateBill } from '../controllers/generateBillController.js';

const router = express.Router();

// Route to generate bill
router.post('/', generateBill);

export default router;
