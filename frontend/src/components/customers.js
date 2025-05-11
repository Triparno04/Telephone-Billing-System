// In components/customer.js (Frontend)
import React, { useEffect, useState } from "react";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "" });
  const [editCustomer, setEditCustomer] = useState(null);

  // Fetch customers from the backend
  useEffect(() => {
    fetch("http://localhost:5000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  // Add a new customer
  const handleAddCustomer = async () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert("Please enter both Name and Email");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });

      const data = await response.json();

      if (response.ok) {
        setCustomers([...customers, data]);
        setNewCustomer({ name: "", email: "" });
      } else {
        console.error("Failed to add customer:", data);
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  // Delete a customer
  const handleDeleteCustomer = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/customers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCustomers(customers.filter((c) => c._id !== id));
      } else {
        console.error("Failed to delete customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Start editing a customer
  const handleEditClick = (customer) => {
    setEditCustomer(customer);
    setNewCustomer({ name: customer.name, email: customer.email });
  };

  // Update a customer
  const handleUpdateCustomer = async () => {
    if (!editCustomer) return;

    try {
      const response = await fetch(
        `http://localhost:5000/customers/${editCustomer._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCustomer),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCustomers(
          customers.map((c) =>
            c._id === editCustomer._id ? { ...c, ...data } : c
          )
        );
        setEditCustomer(null);
        setNewCustomer({ name: "", email: "" });
      } else {
        console.error("Failed to update customer:", data);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div>
      <h2>Customers</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer._id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <button onClick={() => handleEditClick(customer)}>Edit</button>
                <button onClick={() => handleDeleteCustomer(customer._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editCustomer ? "Edit Customer" : "Add Customer"}</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newCustomer.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newCustomer.email}
        onChange={handleChange}
        required
      />
      {editCustomer ? (
        <button onClick={handleUpdateCustomer}>Update Customer</button>
      ) : (
        <button onClick={handleAddCustomer}>Add Customer</button>
      )}
    </div>
  );
}

export default Customers;
