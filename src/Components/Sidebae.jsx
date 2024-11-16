import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Sidebae = () => {
  const { data: session, status } = useSession();

  // Check if the user is authenticated and extract the role if available
  let role = null;
  if (status === "authenticated") {
    role = session?.user?.role;
  }

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

      {/* Only show the "Users" link if the user's role is 0 (admin) */}
      {role === 0 && (
        <li className="nav-item">
          <Link href="/Users" className="nav-link">
            <span>Users</span>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Sidebae;
