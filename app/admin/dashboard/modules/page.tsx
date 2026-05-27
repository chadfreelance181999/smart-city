"use client";

import { useState, useEffect } from "react";

import { UserModel } from "@/app/generated/prisma/internal/prismaNamespaceBrowser";

export default function AdminDashboardModulesPage() {
  const [users, setUsers] = useState<UserModel[]>([])

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('/api/users')
      const users =  await res.json()
      setUsers(users)
    }

    getUsers()
  }, []);


  return (
    <main className="min-h-screen bg-gradient-to-br from-[#12093b] via-[#1b0f5c] to-[#2d1b75] text-white p-6 md:p-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Smart City Admin Panel
          </h1>

          <p className="text-gray-300 mt-3">
            Manage modules.
          </p>
        </div>
      </div>

      {/* USERS CRUD TABLE */}
      <section className="mt-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold">User Credentials</h2>

            <p className="text-gray-300 mt-2">
              Create, Read, Update, and Delete users.
            </p>
          </div>

          <button className="px-5 py-3 rounded-2xl bg-cyan-400 text-black font-semibold hover:scale-105 transition">
            + Add module
          </button>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Username</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4">{user.id}</td>

                  <td className="px-6 py-4">{user.firstName}</td>


                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-semibold ${
                        user.userType === "ADMIN"
                          ? "bg-red-500/20 text-red-300 border border-red-400/20"
                          : "bg-cyan-500/20 text-cyan-300 border border-cyan-400/20"
                      }`}
                    >
                      {user.userType}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 rounded-xl text-black font-medium hover:scale-105 transition">
                        Update
                      </button>

                      <button className="px-4 py-2 rounded-xl text-white font-medium hover:scale-105 transition">
                        Delete
                      </button>

                      <button className="px-4 py-2 rounded-xl text-white font-medium hover:scale-105 transition">
                        Read
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
