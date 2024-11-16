import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setLoading } from "../reducers/usersSlice";
import Layout from "../Components/Layout/Layout";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setLoading());

      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch(setUsers(usersData));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const mapRole = (role) => {
    switch(role) {
      case 1:
        return 'Doctor';
      case 2:
        return 'Patient';
      case 0:
        return 'Admin';
      default:
        return 'Unknown';
    }
  };

  return (
    <Layout>
      <Head>
        <title>All Users</title>
        <meta name="description" content="View all users in the system, including admin, doctors, and patients." />
      </Head>

      <div className="container mt-3">
        <h1>All Users</h1>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>_ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{mapRole(user.role)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      disabled={user.role === 0}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Users;
