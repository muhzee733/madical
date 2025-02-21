import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { InlineWidget } from "react-calendly";
import Layout from "../components/Layout/Layout";

const Patient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== 2) {
      router.push("/unauthorized");
    }
  }, [status, session, router]);

  return (
    <Layout>
      <div className="container">
        <h1>Book Slot To Meet Doctor!</h1>
        <InlineWidget url="https://calendly.com/geeklies-agency/test?preview_source=et_card&month=2025-02" />
      </div>
    </Layout>
  );
};

export default Patient;
