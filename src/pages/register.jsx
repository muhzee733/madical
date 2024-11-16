import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { BsEnvelope, BsEye, BsEyeSlash, BsTelephone } from "react-icons/bs";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { setDoc, doc, getDocs, collection, query, where, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState(null); // Track if questions are answered

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password validation
  const isPasswordStrong = (password) => {
    return password.length >= 8 && password !== "12345678";
  };

  // Email validation function
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation function
  const isPhoneValid = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/; // Basic format, adjust as needed
    return phoneRegex.test(phone);
  };

  // Check if user answers the questions
  const checkUserAnswers = () => {
    const savedAnswers = sessionStorage.getItem("userAnswers");
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers));
    }
  };

  // Redirect to pre-screen if not filled
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const phone = phoneRef.current.value;

    // Check if user answered questions
    if (!userAnswers) {
      Swal.fire({
        title: "Please Complete the Pre-screen Form",
        text: "You need to fill out the questions before registering.",
        icon: "warning",
        confirmButtonText: "Go to Pre-screen",
      }).then(() => {
        router.push("/preScreen");
      });
      setIsLoading(false);
      return;
    }

    // Basic field validations
    if (!isEmailValid(email)) {
      setError("Please enter a valid email.");
      setIsLoading(false);
      return;
    }
    if (!isPasswordStrong(password)) {
      setError("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }
    if (!isPhoneValid(phone)) {
      setError("Please enter a valid phone number.");
      setIsLoading(false);
      return;
    }

    try {
      // Check if email already exists
      const emailMethods = await fetchSignInMethodsForEmail(auth, email);
      if (emailMethods.length > 0) {
        setError("This email is already registered.");
        setIsLoading(false);
        return;
      }

      // Check if phone number already exists
      const phoneQuery = query(collection(db, "users"), where("phone", "==", phone));
      const phoneSnapshot = await getDocs(phoneQuery);
      if (!phoneSnapshot.empty) {
        setError("This phone number is already registered.");
        setIsLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      const userData = {
        firstName,
        lastName,
        email,
        phone,
        role: 2,
        _id: user.uid,
        answers: userAnswers, // Store answers from pre-screen
      };

      await setDoc(doc(db, "users", user.uid), userData);

      Swal.fire({
        title: "Success!",
        text: "Registration successful.",
        icon: "success",
        confirmButtonText: "Okay",
      }).then(() => {
        router.push("/login");
      });

      // Reset form fields
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      phoneRef.current.value = "";

      setIsLoading(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserAnswers(); // Check if user answered the pre-screen questions
  }, []);

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
              <form onSubmit={handleRegister} className="ajax-contact form-wrap3 mb-30">
                <div className="form-title">
                  <h3 className="h1 mb-5">Register as a Patient!</h3>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                <div className="form-group mb-15">
                  <input
                    type="text"
                    className="form-control style3"
                    placeholder="Enter Your First Name"
                    ref={firstNameRef}
                    required
                  />
                </div>
                <div className="form-group mb-15">
                  <input
                    type="text"
                    className="form-control style3"
                    placeholder="Enter Your Last Name"
                    ref={lastNameRef}
                    required
                  />
                </div>
                <div className="form-group mb-15">
                  <input
                    type="email"
                    className="form-control style3"
                    placeholder="Enter Your Email"
                    ref={emailRef}
                    required
                  />
                  <BsEnvelope className="position-absolute" style={{ right: "20px", top: "20px" }} />
                </div>
                <div className="form-group mb-15">
                  <input
                    type="tel"
                    className="form-control style3"
                    placeholder="Enter Your Phone Number"
                    ref={phoneRef}
                    required
                  />
                  <BsTelephone className="position-absolute" style={{ right: "20px", top: "20px" }} />
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
                    style={{ right: "10px", top: "15px", border: "0", background: "transparent" }}
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
                  <Link href="/login" className="mb-0">Login Screen</Link>
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
