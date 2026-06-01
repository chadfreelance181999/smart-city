"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#12093b] via-[#1b0f5c] to-[#2d1b75] flex items-center justify-center px-6">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8 md:p-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">
            🔐
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Admin Login
          </h1>

          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Access the Smart City Management Dashboard
          </p>
        </div>

        {/* Form */}
        <form
          action={async () => {
            await signIn("credentials", {
              email: email,
              password: password,
              userType: 'ADMIN',
              redirectTo: '/admin/dashboard'
            });
          }}
        >
          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-sm text-gray-300">Email</label>

              <input
                type="email"
                placeholder="Enter email"
                className="w-full p-4 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-gray-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 transition"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className="w-full p-4 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-gray-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 transition"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-purple-500" />
                Remember me
              </label>

              <button className="hover:text-white transition">
                Forgot Password?
              </button>
            </div>

            {/* Button */}
            <button
              className="w-full py-4 rounded-xl bg-white text-black font-semibold shadow-lg hover:scale-[1.02] hover:bg-gray-200 transition-all duration-300"
              type="submit"
            >
              Login as Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
