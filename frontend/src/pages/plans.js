import React, { useEffect, useState } from "react";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    callRate: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/plans")
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((error) => console.error("Error fetching plans:", error));
  }, []);

  const handleChange = (e) => {
    setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
  };

  const handleAddPlan = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlan),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlans([...plans, data]);
        setNewPlan({ name: "", price: "", callRate: "" });
      })
      .catch((error) => console.error("Error adding plan:", error));
  };

  return (
    <div>
      <button className="back-button" onClick={() => window.history.back()}>
        &lt;
      </button>
      <h1>Plans</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Plan ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Call Rate</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan._id}</td>
              <td>{plan.name}</td>
              <td>${plan.price}</td>
              <td>${plan.callRate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add Plan</h2>
      <form onSubmit={handleAddPlan}>
        <input
          type="text"
          name="name"
          placeholder="Plan Name"
          value={newPlan.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newPlan.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="callRate"
          placeholder="Call Rate"
          value={newPlan.callRate}
          onChange={handleChange}
        />
        <button type="submit">Add Plan</button>
      </form>
    </div>
  );
};

export default Plans;
