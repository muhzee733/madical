import React, { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsEnvelope, BsEye, BsEyeSlash } from "react-icons/bs";
import { auth } from "../../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      Swal.fire({
        title: "Success!",
        text: "Login successful. Redirecting...",
        icon: "success",
        confirmButtonText: "Okay"
      }).then(() => {
        router.push("/patient");
      });
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Invalid email or password",
        icon: "error",
        confirmButtonText: "Try Again"
      });
    }
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
              <form onSubmit={handleLogin} className="ajax-contact form-wrap3 mb-30">
                <div className="form-title">
                  <h3 className="h1 mb-5">Nice to see you again</h3>
                </div>
                <div className="form-group mb-15">
                  <input
                    type="email"
                    className="form-control style3"
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
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <Link href="/register" className="mb-0">
                    Register as a Patient
                  </Link>
                  <Link href="/forgot-password" className="mb-0">
                    Forget Password
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

export default Login;
