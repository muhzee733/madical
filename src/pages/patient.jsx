import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { InlineWidget } from "react-calendly";
import Head from "next/head";
import Layout from "../components/data";
import { FaStethoscope } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { FaFaceGrinHearts } from "react-icons/fa6";

const Patient = () => {
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (!userData || userData.role !== 2) {
      router.push("/unauthorized");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Patient Dashboards</title>
      </Head>

      <Layout>
        <div className="row">
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="dash-widget">
              <span className="dash-widget-bg1">
                <FaStethoscope />
              </span>
              <div className="dash-widget-info" style={{ textAlign: "right" }}>
                <h3>98</h3>
                <span className="widget-title1">
                  Doctors <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="dash-widget">
              <span className="dash-widget-bg2">
                <FaCircleUser />
              </span>
              <div className="dash-widget-info" style={{ textAlign: "right" }}>
                <h3>1072</h3>
                <span className="widget-title2">
                  Patients <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="dash-widget">
              <span className="dash-widget-bg3">
                <FaUserDoctor />
              </span>
              <div className="dash-widget-info" style={{ textAlign: "right" }}>
                <h3>72</h3>
                <span className="widget-title3">
                  Attend <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="dash-widget">
              <span className="dash-widget-bg4">
                <FaFaceGrinHearts />
              </span>
              <div className="dash-widget-info" style={{ textAlign: "right" }}>
                <h3>618</h3>
                <span className="widget-title4">
                  Pending <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="dash-widget">
              <InlineWidget url="https://calendly.com/geeklies-agency/test" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Patient;
