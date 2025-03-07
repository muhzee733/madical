import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { InlineWidget } from "react-calendly";
import Head from "next/head";

const Patient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (status === "unauthenticated" || session?.user?.role !== 2) {
      router.replace("/unauthorized"); // Redirect to unauthorized page
    }
  }, [status, session, router]);

  if (status === "loading") return <p>Loading...</p>; // Show loading state
  if (!session || session.user.role !== 2) return null; // Prevent flickering

  return (
    <>
      <Head>
        <title>Patient Dashboard</title>
      </Head>
      <div className="container py-5">
        <h1 className="text-center mb-4">Book a Slot to Meet Doctor!</h1>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Available Slots</h5>
                <InlineWidget url="https://calendly.com/geeklies-agency/test" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patient;
