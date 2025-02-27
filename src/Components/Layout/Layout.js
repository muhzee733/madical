import React from "react";
// import Header from "../header";
// import Sidebae from "../Sidebae";

const Layout = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <aside id="sidebar" className="sidebar">
        {/* <Sidebae /> */}
      </aside>
      <main id="main" className="main">
        {children}
      </main>
    </>
  );
};

export default Layout;
