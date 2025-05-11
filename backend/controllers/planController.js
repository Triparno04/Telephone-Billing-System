import Plan from "../models/plan.js";

// Create Plan
export const createPlan = async (req, res) => {
  try {
    const { name, price, callRate } = req.body; // ✅ Accept callRate also
    const newPlan = await Plan.create({ name, price, callRate });
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
