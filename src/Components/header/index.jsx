import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux"; // Import necessary hooks
import { clearUser } from "../../reducers/authSlice";

const Index = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const onlineStatus = useSelector((state) => state.auth.online); 
  const email = session?.user?.email || "Guest";

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/login",
    });
    dispatch(clearUser()); // Dispatch clearUser when signing out
  };

  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="#" className="logo d-flex align-items-center">
            <span className="d-none d-lg-block">NiceAdmin</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>

        <div className="search-bar">
          <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle" href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>

            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {session ? email : "Guest"}
                  <span
                    className={`status-indicator ${
                      onlineStatus ? "online" : "offline"
                    }`}
                    style={{ marginLeft: "10px", fontSize: "12px" }}
                  >
                    {onlineStatus ? "Online" : "Offline"}
                  </span>
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{email}</h6>
                  <span
                    className={`status-indicator ${
                      onlineStatus ? "online" : "offline"
                    }`}
                    style={{ fontSize: "14px", marginLeft: "10px" }}
                  >
                    {onlineStatus ? "Online" : "Offline"}
                  </span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <span
                    onClick={handleSignOut}
                    style={{
                      cursor: "pointer",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    Sign Out
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Index;
