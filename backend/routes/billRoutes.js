// backend/routes/billRoutes.js
import express from "express";
import Bill from "../models/bill.js";  // Make sure you are importing the Bill model
import { generateBill } from "../controllers/billController.js";  // Import the generateBill controller

const router = express.Router();

// Get all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to generate a new bill
router.post("/", generateBill);

// DELETE route to delete a bill by ID
router.delete("/:id", async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);  // Delete bill by ID
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting bill' });
  }
});

export default router;
