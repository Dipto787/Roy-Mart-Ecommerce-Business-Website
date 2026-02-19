"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle between login/register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ===== LOGIN =====
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/"); // redirect to homepage after login
    } else {
      alert(res?.error || "Login failed");
    }
  };

  // ===== REGISTER =====
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        alert("Registration successful! Please login.");
        setIsLogin(true);
        setPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-4xl bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl shadow-2xl overflow-hidden md:flex">

        {/* ===== Left Side Image / Banner ===== */}
        <div className="hidden md:flex md:w-1/2 bg-cover bg-center relative"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616627984002-ec1eab69bdf1')" }}>
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-gray-300">Sign in to continue shopping premium products</p>
          </div>
        </div>

        {/* ===== Right Side Form ===== */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          {/* Toggle */}
          <div className="flex justify-center mb-8 gap-4">
            <button
              className={`px-6 py-2 rounded-full font-semibold transition ${isLogin ? "bg-white text-black" : "bg-gray-700 text-gray-300"}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold transition ${!isLogin ? "bg-white text-black" : "bg-gray-700 text-gray-300"}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* Form */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <h1 className="text-2xl font-bold mb-4">Login to Your Account</h1>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="text-sm text-gray-400 text-center mt-2">
                Don't have an account?{" "}
                <span onClick={() => setIsLogin(false)} className="text-white font-semibold cursor-pointer hover:underline">
                  Register
                </span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <h1 className="text-2xl font-bold mb-4">Create a New Account</h1>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              <p className="text-sm text-gray-400 text-center mt-2">
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)} className="text-white font-semibold cursor-pointer hover:underline">
                  Login
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
