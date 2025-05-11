import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Name is now required
  email: { type: String, required: true, unique: true },  // Email is required and unique
  phone: { type: String, required: true, unique: true },  // Added phone field, required and unique
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
