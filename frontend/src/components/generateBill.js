import React, { useState, useEffect } from 'react';

const GenerateBill = () => {
  const [customers, setCustomers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [callUsage, setCallUsage] = useState(0);
  const [billDetails, setBillDetails] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/customers')
      .then(response => response.json())
      .then(data => setCustomers(data));

    fetch('http://localhost:5000/plans')
      .then(response => response.json())
      .then(data => setPlans(data));
  }, []);

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handleUsageChange = (e) => {
    setCallUsage(e.target.value);
  };

  const generateBill = () => {
    const plan = plans.find(plan => plan._id === selectedPlan);
    
    if (plan) {
      const calculatedAmount = plan.price * callUsage;

      const billId = `BILL-${Math.floor(Math.random() * 1000000)}`;

      const billDetails = {
        billId: billId,
        customerName: customers.find(customer => customer._id === selectedCustomer)?.name,
        planName: plan.name,
        callRate: plan.price,
        callUsage: callUsage,
        totalAmount: calculatedAmount,
        dueDate: new Date().toISOString() // Adding due date (assuming it's today's date)
      };

      setBillDetails(billDetails);

      fetch('http://localhost:5000/generate-bill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: selectedCustomer,  // Pass selectedCustomer here
          planId: selectedPlan,  // Send planId here
          callUsage: callUsage,  // Send callUsage here
          dueDate: billDetails.dueDate
        })
      })
      .then(response => response.json())
      .then(data => alert('Bill generated successfully!'))
      .catch(error => console.error('Error generating bill:', error));
    }
  };

  return (
    <div>
      <h1>Generate Bill</h1>
      <label>Select Customer: </label>
      <select onChange={handleCustomerChange}>
        <option value="">Select Customer</option>
        {customers.map(customer => (
          <option key={customer._id} value={customer._id}>
            {customer.name}
          </option>
        ))}
      </select>

      <label>Select Plan: </label>
      <select onChange={handlePlanChange}>
        <option value="">Select Plan</option>
        {plans.map(plan => (
          <option key={plan._id} value={plan._id}>
            {plan.name}
          </option>
        ))}
      </select>

      <label>Enter Call Usage: </label>
      <input 
        type="number" 
        value={callUsage} 
        onChange={handleUsageChange} 
        placeholder="Number of calls"
      />

      <button onClick={generateBill}>Generate Bill</button>

      {billDetails && (
        <div>
          <h2>Bill Details</h2>
          <p><strong>Bill ID:</strong> {billDetails.billId}</p>
          <p><strong>Customer Name:</strong> {billDetails.customerName}</p>
          <p><strong>Plan Name:</strong> {billDetails.planName}</p>
          <p><strong>Call Rate:</strong> ${billDetails.callRate} per call</p>
          <p><strong>Call Usage:</strong> {billDetails.callUsage} calls</p>
          <p><strong>Total Amount:</strong> ${billDetails.totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateBill;
