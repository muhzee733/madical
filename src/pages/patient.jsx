import React, { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import Head from "next/head";
import withRoleProtection from "../components/withRoleProtection";

const Patient = () => {

  return (
    <>
      <Head>
        <title>Patient Dashboards</title>
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

export default withRoleProtection(Patient, [2]);
