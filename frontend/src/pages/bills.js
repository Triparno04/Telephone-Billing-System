import React, { useEffect, useState } from "react";

function Bills() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/bills")
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((error) => console.error("Error fetching bills:", error));
  }, []);

  const deleteBill = async (billId) => {
    try {
      const response = await fetch(`http://localhost:5000/bills/${billId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
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
      {/* 🔵 Back Button Added */}
      <button className="back-button" onClick={() => window.history.back()}>
        &lt;
      </button>

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id}>
              <td>{bill._id}</td>
              <td>{bill.customerName}</td>
              <td>{bill.planName}</td>
              <td>${bill.amount}</td>
              <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
              <td>{bill.callUsage} calls</td>
              <td>
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
