import Bill from "../models/bill.js";
import Customer from "../models/customer.js";
import Plan from "../models/plan.js";

export const generateBill = async (req, res) => {
  const { customerId, planId, callUsage, dueDate } = req.body;

  try {
    console.log("Received request:", req.body);

    // Validate required fields
    if (!customerId || !planId || callUsage === undefined || !dueDate) {
      return res.status(400).json({ message: 'All fields (customerId, planId, callUsage, dueDate) are required' });
    }

    const customer = await Customer.findById(customerId);
    const plan = await Plan.findById(planId);

    if (!customer) {
      console.log(`Customer with ID ${customerId} not found`);
      return res.status(400).json({ message: 'Invalid customer ID' });
    }

    if (!plan) {
      console.log(`Plan with ID ${planId} not found`);
      return res.status(400).json({ message: 'Invalid plan ID' });
    }

    // Important: Validate if callRate exists
    const callRate = plan.callRate; // Correct field
    if (isNaN(callRate) || isNaN(callUsage)) {
      console.error(`Invalid values: callRate = ${callRate}, callUsage = ${callUsage}`);
      return res.status(400).json({ message: 'Invalid values for callRate or callUsage' });
    }

    const amount = callRate * callUsage; // Use callRate

    if (isNaN(amount)) {
      return res.status(400).json({ message: 'Invalid amount calculation' });
    }

    const bill = new Bill({
      customer: customerId,
      customerName: customer.name,
      planName: plan.name,
      callUsage: callUsage,
      callRate: callRate,          // Pass callRate also
      amount: amount,
      dueDate: dueDate,
    });

    await bill.save();

    console.log("Bill generated and saved:", bill);

    res.status(201).json(bill);
  } catch (error) {
    console.error("Error in generating bill:", error);
    res.status(500).json({ message: 'Error generating bill' });
  }
};
