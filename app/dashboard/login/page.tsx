"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#12093b] via-[#1b0f5c] to-[#2d1b75] flex items-center justify-center px-6">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">
            👤
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            User Login
          </h1>

          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Welcome back to Smart City Management Platform
          </p>
        </div>

        {/* Form */}
        <form
          action={async () => {
            await signIn("credentials", {
              email: email,
              password: password,
              redirectTo: "/dashboard",
            });
          }}
        >
          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter username"
                className="w-full p-4 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className="w-full p-4 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-cyan-500" />
                Remember me
              </label>

              <button className="hover:text-white transition">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button className="w-full py-4 rounded-xl bg-white text-black font-semibold shadow-lg hover:scale-[1.02] hover:bg-gray-200 transition-all duration-300">
              Login as User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
