import React, { useEffect, useState } from "react";
import { FaUserDoctor, FaRocketchat } from "react-icons/fa6";
import { FiAirplay } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

const Layout = ({ children, unreadCount }) => {
  const [patientId, setPatientId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setPatientId(storedUser.role);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    router.push("/login");
  };
  const doctorHandle = () => {
    sessionStorage.removeItem("doctor");
    router.push("/doctor-login");
  };

  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <a href="index-2.html" className="logo">
              <img src="/assets/logo.png" width="150" height="35" alt="Logo" />
            </a>
          </div>

          {/* User Dropdown Menu */}
          <ul className="nav user-menu float-right">
            <li className="nav-item dropdown has-arrow">
              <button
                className="dropdown-toggle nav-link user-link"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="user-img">
                  <img
                    className="rounded-circle"
                    src="/assets/user.jpg"
                    width="24"
                    alt="Admin"
                  />
                </span>
                <span>Admin</span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <ul className="dropdown-menu show">
                  <li>
                    <Link href="/profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    {patientId === 2 ? (
                      <button onClick={handleLogout} className="dropdown-item">
                        Logout
                      </button>
                    ) : (
                      <button onClick={doctorHandle} className="dropdown-item">
                        Logout
                      </button>
                    )}
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">Main</li>
              {patientId === 2 ? (
                <li className="active">
                  <Link href="/patient">
                    <FiAirplay /> <span>Dashboard</span>
                  </Link>
                </li>
              ) : (
                <li className="active">
                  <Link href="/doctor">
                    <FiAirplay /> <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {patientId === 2 && (
                <li>
                  <Link href="/chatsystem">
                    <div>
                      <FaRocketchat /> <span>Chat</span>
                    </div>
                    {unreadCount > 0 && (
                      <span className="badge">{unreadCount}</span>
                    )}
                  </Link>
                </li>
              )}
              <li>
                <a href="#">
                  <FaUserDoctor /> <span>Doctor</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="page-wrapper">
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default Layout;
