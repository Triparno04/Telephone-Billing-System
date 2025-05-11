import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 style={{ color: "white", cursor: "pointer" }}>Telephone Billing System</h2>
      </Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/plans">Plans</Link></li>
        <li><Link to="/bills">Bills</Link></li>
        <li><Link to="/generate-bill">Generate Bill</Link></li>
      </ul>
      <Link to="/login" className="login-button">Login</Link>
    </nav>
  );
}

export default Nav;
