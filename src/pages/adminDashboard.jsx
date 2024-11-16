import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "../Components/Layout/Layout";
import Doctor from "./doctor";
import Patient from "./patient";
import Dashboard from "./admin";
import { useRouter } from "next/router";
import Head from "next/head";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to login if the user is not authenticated
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  // Check if session is defined and has user information
  const { role } = session?.user || {}; // Use optional chaining to avoid accessing user if session is undefined

  return (
    <>
    <Head>
      <title>Dashboard</title>
    </Head>
      <Layout>
        {role === 0 && <Dashboard />}
        {role === 1 && <Doctor />}
        {role === 2 && <Patient />}
      </Layout>
    </>
  );
};

export default AdminDashboard;
