import express from "express";
import Customer from "../models/customer.js";

const router = express.Router();

// Create a Customer
router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body; // Added phone field
    if (!name || !email || !phone) { // Check if all fields are provided
      return res.status(400).json({ error: "Name, Email, and Phone are required" });
    }

    const newCustomer = new Customer({ name, email, phone }); // Include phone in the new customer
    await newCustomer.save();
    console.log("New Customer Added:", newCustomer);
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get Customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a Customer
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log("Customer Deleted:", customer);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update a Customer
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body; // Include phone field
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, phone }, // Include phone in the update
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log("Customer Updated:", updatedCustomer);
    res.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
