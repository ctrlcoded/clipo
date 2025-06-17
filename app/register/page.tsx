"use client"; // Enables client-side rendering and hooks usage

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
  // State hooks for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  // Handles form submission
  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation to check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Send registration data to API route
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      console.log(data); // Optional: remove in production
      router.push("/login"); // Navigate to login page on success

    } catch (error) {
      console.error(error); // Log error if request fails
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSumit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Updates email state
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Updates password state
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // Updates confirmPassword state
        />
        <button type="submit">Register</button>
      </form>

      {/* Link to login page */}
      <div>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
