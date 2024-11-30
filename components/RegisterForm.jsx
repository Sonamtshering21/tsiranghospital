"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles/register.module.css"; // Import your styles

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [verificationCode, setVerificationCode] = useState(""); // State for verification code
  const [showVerificationForm, setShowVerificationForm] = useState(false); // Whether to show the verification code form
  const [userData, setUserData] = useState(null); // To store user data temporarily

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      // Store user data temporarily in state, do not save it to the database yet
      setUserData({ name, email, password });

      setSuccessMessage("Please enter the verification code.");
      setError(""); // Clear any previous error messages
      setShowVerificationForm(true); // Show the verification form
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("An unexpected error occurred. Please try again."); // Generic error message
      setSuccessMessage(""); // Clear success message if error occurs
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    if (!verificationCode) {
      setError("Verification code is required.");
      return;
    }

    try {
      console.log("Frontend verification code:", verificationCode); // Log before sending

      // Verify the code entered by the user
      const res = await fetch("api/verify_code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode }), // No need to send email, just the verification code
      });

      const data = await res.json();
     
      if (data.success) {
        // After successful verification, now send user data to the backend to register the account
        const accountRes = await fetch("api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData), // Use the stored user data here
        });

        if (accountRes.ok) {
          setSuccessMessage("Account created successfully!");
          setError(""); // Clear any error messages
          setTimeout(() => {
            router.push("/"); // Redirect to login after account creation
          }, 2000);
        } else {
          const accountData = await accountRes.json();
          setError(accountData.message);
          setSuccessMessage(""); // Clear success message if error occurs
        }
      } else {
        setError("Invalid verification code.");
        setSuccessMessage(""); // Clear success message if code is invalid
      }
    } catch (error) {
      console.log("Error during verification: ", error);
      setError("An unexpected error occurred during verification. Please try again.");
      setSuccessMessage(""); // Clear success message if error occurs
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            required
            className={styles.input}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>
            Register
          </button>

          {error && <div className={styles.error}>{error}</div>}
          {successMessage && <div className={styles.success}>{successMessage}</div>}

          <Link className={styles.link} href={"/login"}>
            Already have an account? <span className={styles.underline}>Login</span>
          </Link>
        </form>

        {/* Verification code form */}
        {showVerificationForm && (
          <form onSubmit={handleVerificationSubmit} className={styles.form}>
            <input
              onChange={(e) => setVerificationCode(e.target.value)}
              type="text"
              placeholder="Enter Verification Code"
              required
              className={styles.input}
            />
            <button type="submit" className={styles.submitButton}>
              Verify Code
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
