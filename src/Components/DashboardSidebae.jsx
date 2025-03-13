import React, { useEffect, useState } from "react";
import { FaUserDoctor, FaRocketchat } from "react-icons/fa6";
import { FiAirplay } from "react-icons/fi";
import Link from "next/link";

const DashboardSidebae = () => {
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setPatientId(storedUser.role);
    }
  }, []);
  return (
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
  );
};

export default DashboardSidebae;
