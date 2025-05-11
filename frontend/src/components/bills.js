// frontend/src/components/bills.js
import React, { useEffect, useState } from "react";

function Bills() {
  const [bills, setBills] = useState([]); // To store bills data
  const [customers, setCustomers] = useState([]); // To store customer data

  // Fetch bills and customers on component load
  useEffect(() => {
    // Fetch bills
    fetch("http://localhost:5000/bills")
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((error) => console.error("Error fetching bills:", error));

    // Fetch customers
    fetch("http://localhost:5000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  // Function to get customer name by customerId
  const getCustomerName = (customerId) => {
    const customer = customers.find((customer) => customer._id === customerId);
    return customer ? customer.name : "Unknown"; // Return "Unknown" if no customer found
  };

  // Delete bill function
  const deleteBill = async (billId) => {
    try {
      const response = await fetch(`http://localhost:5000/bills/${billId}`, {
        method: 'DELETE', // Use DELETE method
      });

      if (response.ok) {
        // Remove the bill from the state to update UI without needing a refresh
        setBills((prevBills) => prevBills.filter((bill) => bill._id !== billId));
      } else {
        console.error('Failed to delete bill');
      }
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  return (
    <div>
      <h2>Bills</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Customer Name</th>
            <th>Plan Name</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Call Usage</th>
            <th>Actions</th> {/* Added Actions column for delete */}
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id}>
              <td>{bill._id}</td>
              <td>{getCustomerName(bill.customer)}</td>  {/* Get customer name manually */}
              <td>{bill.planName}</td>
              <td>${bill.amount}</td>
              <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
              <td>{bill.callUsage} calls</td>
              <td>
                {/* Delete Button */}
                <button onClick={() => deleteBill(bill._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bills;
