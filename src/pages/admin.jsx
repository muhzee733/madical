import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import Header from "../Components/header";
import Sidebae from "../Components/Sidebae";

const AdminPage = ({ user }) => {
  useEffect(() => {
    document.title = "Dashboard | Doctor";
  }, []);
  return (
    <div>
      <Header />
      <aside id="sidebar" class="sidebar">
        <Sidebae />
      </aside>
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Admin Dashboard</h1>
        </div>
        <section class="section dashboard">
          <div class="row">
            <div class="col-lg-8">
              <div class="row">
                <div class="col-xxl-4 col-md-6">
                  <div class="card info-card sales-card">
                    <div class="card-body">
                      <h5 class="card-title">
                        Total Patients
                      </h5>

                      <div class="d-flex align-items-center">
                        <div class="ps-3">
                          <h6>145</h6>
                          <span class="text-success small pt-1 fw-bold">
                            12%
                          </span>{" "}
                          <span class="text-muted small pt-2 ps-1">
                            increase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 0) {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}

export default AdminPage;
