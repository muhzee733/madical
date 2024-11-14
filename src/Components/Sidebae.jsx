import React from "react";
import Link from "next/link";

const Sidebae = () => {
  return (
    <ul className="sidebar-nav" id="sidebar-nav">
      <li className="nav-item">
        <Link href="/adminDashboard" className="nav-link">
          <span>Dashboard</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/profile" className="nav-link">
          <span>Profile</span>
        </Link>
      </li>
    </ul>
  );
};

export default Sidebae;
