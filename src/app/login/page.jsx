"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: redirect,
      });

      if (response?.ok) {
        toast.success("Successfully signed in 🎉");
        router.push(redirect);
      } else {
        toast.error("Invalid email or password ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-xl shadow-lg p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-white">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Welcome back. Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400">
              <input type="checkbox" className="accent-white" />
              Remember me
            </label>
            <a href="#" className="text-gray-400 hover:text-white">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-md font-medium transition-colors duration-200 
              ${loading ? "bg-gray-400 text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-200"}
            `}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            href={`/register?redirect=${encodeURIComponent(redirect)}`}
            className="text-white hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
