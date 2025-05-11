import React, { useState } from "react";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState("");

  const addPlan = () => {
    if (plan.trim() === "") return;
    setPlans([...plans, { id: plans.length + 1, plan }]);
    setPlan("");
  };

  return (
    <div>
      <h2>Plans</h2>
      <input
        type="text"
        placeholder="Enter plan name"
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
      />
      <button onClick={addPlan}>Add</button>
      <ul>
        {plans.map((p) => (
          <li key={p.id}>{p.plan}</li>
        ))}
      </ul>
    </div>
  );
}

export default Plans;
