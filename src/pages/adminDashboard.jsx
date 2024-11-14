import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "../Components/Layout/Layout";
import Doctor from "./doctor";
import Patient from "./patient";

import Dashboard from "./admin";

const AdminDashboard = () => {
  useEffect(() => {
    document.title = "Profile";
  }, []);
  const { data: session } = useSession();
  if (!session) {
    return <div>Loading...</div>;
  }
  const { role } = session.user;
  return (
    <Layout>
      {role === 0 && <Dashboard />}
      {role === 1 && <Doctor />}
      {role === 2 && <Patient />}
    </Layout>
  );
};

export default AdminDashboard;
