import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsEnvelope, BsEye, BsEyeSlash } from "react-icons/bs";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const Login = () => {
  const data = useSelector((state) => state.userData);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password
      });
      setIsLoading(false);
      if(result?.status === 200){
        Swal.fire({
          title: "Success!",
          text: "Login successful. Redirecting...",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }else{
        Swal.fire({
          title: "Error!",
          text: "Invalid Credentials",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }catch(error){
      console.log(error)
    }
  };
  useEffect(() => {
    if (data?.role !== undefined) {
      router.push("/adminDashboard");
    }
  }, [data?.role, router]);

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
