import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  callRate: { type: Number, required: true }, // ✅ Only callRate needed
}, { timestamps: true });

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
