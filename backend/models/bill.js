// backend/models/bill.js
import mongoose from "mongoose";

// Add customerName, planName, callRate, callUsage to the schema
const billSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    customerName: { type: String, required: true }, // Added customerName
    planName: { type: String, required: true },     // Added planName
    callRate: { type: Number, required: true },     // Added callRate
    callUsage: { type: Number, required: true },    // Added callUsage
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true }, // Keep dueDate required
  },
  { timestamps: true }
);

// Ensure customer data is populated when we fetch bills
const Bill = mongoose.model("Bill", billSchema);
export default Bill;
