import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.svg";
import profile from "./images/login-profile.png"; // Imported Profile Image

function AdminLogin({ loginHandler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Import and use useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      loginHandler(); // Update login state in App.jsx
      navigate("/admin/dashboard"); // Redirect to AdminDashboard
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section with Profile Image */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center bg-no-repeat h-screen"
        style={{ backgroundImage: `url(${profile})` }}
      ></div>

      {/* Right Section with Login Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 rounded-l-3xl shadow-xl">
        <div className="w-full max-w-sm mx-auto">
          {/* Logo */}
          <div className="absolute left-8 top-8">
            <img src={logo} alt="Logo" className="w-24" />
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold text-center mb-8 uppercase">Log In</h2>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-lg font-medium">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border border-gray-300 rounded-md mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-md mt-4 hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
