import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="main-content">
      <div className="tablet-buttons">
        <Link
          to="/"
          className="tablet-button"
          style={{ backgroundImage: "url('/assets/button1.jpg')" }}
        >
          <div className="button-label">Home</div>
        </Link>
        <Link
          to="/customers"
          className="tablet-button"
          style={{ backgroundImage: "url('/assets/button2.jpg')" }}
        >
          <div className="button-label">Customers</div>
        </Link>
        <Link
          to="/plans"
          className="tablet-button"
          style={{ backgroundImage: "url('/assets/button3.jpg')" }}
        >
          <div className="button-label">Plans</div>
        </Link>
        <Link
          to="/bills"
          className="tablet-button"
          style={{ backgroundImage: "url('/assets/button4.jpg')" }}
        >
          <div className="button-label">Bills</div>
        </Link>
        <Link
          to="/generate-bill"
          className="tablet-button"
          style={{ backgroundImage: "url('/assets/button5.jpg')" }}
        >
          <div className="button-label">Generate Bill</div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
