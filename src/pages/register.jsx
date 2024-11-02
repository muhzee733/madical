import React, { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { BsEnvelope, BsEye, BsEyeSlash } from "react-icons/bs";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useRouter } from "next/router"; // Import useRouter

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter(); // Initialize useRouter

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fullName = fullNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        role: "patient",
      });

      Swal.fire({
        title: "Success!",
        text: "Registration successful.",
        icon: "success",
        confirmButtonText: "Okay"
      });

      // Resetting the form fields
      fullNameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";

      // Redirect to patient dashboard
      router.push("/patient"); // Adjust the path to your dashboard

      setIsLoading(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again"
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register as a patient" />
      </Head>
      <div className="vs-contact-wrapper vs-contact-layout1 mt-5 space-md-bottom">
        <div className="container">
          <div
            className="row gx-60 align-items-center justify-content-center"
            style={{ backgroundColor: "rgb(243, 246, 247)" }}
          >
            <div className="col-lg-6">
              <form
                onSubmit={handleRegister}
                className="ajax-contact form-wrap3 mb-30"
              >
                <div className="form-title">
                  <h3 className="h1 mb-5">Register as a Patient!</h3>
                </div>
                <div className="form-group mb-15">
                  <input
                    type="text"
                    className="form-control style3"
                    name="f_name"
                    id="f_name"
                    placeholder="Enter Your Full Name"
                    ref={fullNameRef}
                    required
                  />
                  <BsEnvelope
                    className="position-absolute"
                    style={{ right: "20px", top: "20px" }}
                  />
                </div>
                <div className="form-group mb-15">
                  <input
                    type="email"
                    className="form-control style3"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    ref={emailRef}
                    required
                  />
                  <BsEnvelope
                    className="position-absolute"
                    style={{ right: "20px", top: "20px" }}
                  />
                </div>
                <div className="form-group mb-15 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control style3"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    ref={passwordRef}
                    required
                  />
                  <button
                    type="button"
                    className="btn-toggle-password position-absolute"
                    style={{
                      right: "10px",
                      top: "15px",
                      border: "0",
                      background: "transparent",
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>

                <div className="form-btn pt-15">
                  <button
                    type="submit"
                    className="vs-btn"
                    style={{ width: "100%", borderRadius: "30px" }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <Link href="/login" className="mb-0">
                    Login Screen
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
