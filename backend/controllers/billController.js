// backend/controllers/billController.js
import Bill from "../models/bill.js";
import Customer from "../models/customer.js";
import Plan from "../models/plan.js";

// Generate a new bill
export const generateBill = async (req, res) => {
  const { customerId, planId, callUsage, dueDate } = req.body;

  try {
    // Validate input fields
    if (!customerId || !planId || callUsage === undefined || !dueDate) {
      return res.status(400).json({ message: 'All fields (customerId, planId, callUsage, dueDate) are required' });
    }

    console.log("Received data:", { customerId, planId, callUsage, dueDate });

    // Fetch customer and plan details
    const customer = await Customer.findById(customerId);
    const plan = await Plan.findById(planId);

    if (!customer || !plan) {
      return res.status(400).json({ message: 'Invalid customer or plan ID' });
    }

    console.log("Customer found:", customer);
    console.log("Plan found:", plan);

    const callRate = plan.callRate;

    // Validate that callRate and callUsage are valid numbers
    if (isNaN(callRate) || isNaN(callUsage)) {
      return res.status(400).json({ message: 'Invalid callRate or callUsage' });
    }

    // Calculate the bill amount
    const amount = callRate * callUsage;

    // Create and save the new bill
    const bill = new Bill({
      customer: customer._id,
      customerName: customer.name,
      planName: plan.name,
      callRate: callRate,
      callUsage: callUsage,
      amount: amount,
      dueDate: dueDate,
    });

    console.log("Saving bill:", bill);

    // Save the bill to the database
    await bill.save();

    console.log("Bill saved successfully:", bill);

    res.status(201).json(bill);  // Return the generated bill in the response
  } catch (error) {
    console.error("Error generating bill:", error);
    res.status(500).json({ message: 'Error generating bill', error: error.message });
  }
};

// Delete a bill by ID
export const deleteBill = async (req, res) => {
  const { id } = req.params; // Get the bill ID from the request params
  try {
    console.log("Delete request received for ID:", id);  // Log to check if the request is coming through
    const bill = await Bill.findByIdAndDelete(id);  // Delete the bill by ID
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error('Error deleting bill:', error);
    res.status(500).json({ message: 'Error deleting bill' });
  }
};
