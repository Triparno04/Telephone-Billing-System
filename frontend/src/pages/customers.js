import React, { useEffect, useState } from "react";
import "../styles/customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");  // Added state for search query

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:5000/customers");
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      alert("Please enter Name, Email, and Phone");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        fetchCustomers(); // Refresh the customer list
        setNewCustomer({ name: "", email: "", phone: "" }); // Clear the form
      } else {
        console.error("Failed to add customer");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      const response = await fetch(`http://localhost:5000/customers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCustomers(); // Refresh list
      } else {
        console.error("Failed to delete customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setNewCustomer({ name: customer.name, email: customer.email, phone: customer.phone });
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    if (!editingCustomer) return;

    try {
      const response = await fetch(`http://localhost:5000/customers/${editingCustomer._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        fetchCustomers(); // Refresh customer list
        setEditingCustomer(null); // Clear the editing state
        setNewCustomer({ name: "", email: "", phone: "" });
      } else {
        console.error("Failed to update customer");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  // Filter customers based on the search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <button className="back-button" onClick={() => window.history.back()}>
        &lt;
      </button>

      <h1>Customers</h1>

      {/* Search input inside the .search-bar container */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer._id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <button onClick={() => handleEditCustomer(customer)}>Edit</button>
                  <button onClick={() => handleDeleteCustomer(customer._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No customers found</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>{editingCustomer ? "Edit Customer" : "Add Customer"}</h2>
      <form onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer}>
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
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingCustomer ? "Update" : "Add Customer"}</button>
        {editingCustomer && <button onClick={() => setEditingCustomer(null)}>Cancel</button>}
      </form>
    </div>
  );
};

export default Customers;
