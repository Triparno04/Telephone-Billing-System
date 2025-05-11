import express from "express";
import Plan from "../models/plan.js";

const router = express.Router();

// Create Plan
router.post("/", async (req, res) => {
  try {
    const { name, price, callRate } = req.body; // ✅ Accept callRate also
    const newPlan = await Plan.create({ name, price, callRate });
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Plans
router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
