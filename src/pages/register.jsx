import React, { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { BsEnvelope, BsEye, BsEyeSlash } from "react-icons/bs"; // Import Bootstrap icons

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your login logic here
    console.log("Logging in with:", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Welcome to our homepage" />
      </Head>
      <div className="vs-contact-wrapper vs-contact-layout1 mt-5 space-md-bottom">
        <div className="container">
          <div
            className="row gx-60 align-items-center justify-content-center"
            style={{ backgroundColor: "rgb(243, 246, 247)" }}
          >
            <div className="col-lg-6">
              <form
                onSubmit={handleLogin}
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
                    ref={emailRef}
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
                  >
                    Register 
                  </button>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <Link href="/login" className="mb-0">
                    Login Screen
                  </Link>
                  {/* <Link href="/forgot-password" className="mb-0">
                    Forget Password
                  </Link> */}
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
