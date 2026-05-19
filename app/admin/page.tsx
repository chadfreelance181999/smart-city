'use client'

import { useState } from 'react'

const modules = [
    {
        id: 1,
        title: 'Command, Control and Data Center',
        links: [
            { label: 'Open Dashboard', url: '#' },
            { label: 'View Reports', url: '#' },
        ],
    },
    {
        id: 2,
        title: 'Social Services Distribution Management System Service',
        links: [
            { label: 'Beneficiaries', url: '#' },
            { label: 'Transactions', url: '#' },
        ],
    },
    {
        id: 3,
        title: 'Health Information Management System',
        links: [
            { label: 'Patient Records', url: '#' },
            { label: 'Health Monitoring', url: '#' },
        ],
    },
    {
        id: 4,
        title: 'City Development Dynamic GIS Mapping',
        links: [
            { label: 'GIS Dashboard', url: '#' },
            { label: 'City Mapping', url: '#' },
        ],
    },
    {
        id: 5,
        title: 'Citizen Registration Management System',
        links: [
            { label: 'Citizen List', url: '#' },
            { label: 'Verification', url: '#' },
        ],
    },
    {
        id: 6,
        title: 'Business Permit License Office System',
        links: [
            { label: 'Permits', url: '#' },
            { label: 'Applications', url: '#' },
        ],
    },
    {
        id: 7,
        title: 'Real Property Tax and Assessment System',
        links: [
            { label: 'Tax Records', url: '#' },
            { label: 'Assessments', url: '#' },
        ],
    },
    {
        id: 8,
        title: 'Procurement, Asset and Inventory Management System',
        links: [
            { label: 'Inventory', url: '#' },
            { label: 'Assets', url: '#' },
        ],
    },
    {
        id: 9,
        title: 'Accounting and Finance Information Management System',
        links: [
            { label: 'Finance Dashboard', url: '#' },
            { label: 'Reports', url: '#' },
        ],
    },
    {
        id: 10,
        title: 'Human Resource Information Management System',
        links: [
            { label: 'Employees', url: '#' },
            { label: 'Payroll', url: '#' },
        ],
    },
]

const sampleUsers = [
    {
        id: 1,
        username: 'admin01',
        password: '••••••••',
        role: 'Admin',
    },
    {
        id: 2,
        username: 'user01',
        password: '••••••••',
        role: 'User',
    },
]

export default function AdminPage() {
    const [selectedModule, setSelectedModule] = useState<any>(null)

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#12093b] via-[#1b0f5c] to-[#2d1b75] text-white p-6 md:p-10">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-10">

                <div>
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Smart City Admin Panel
                    </h1>

                    <p className="text-gray-300 mt-3">
                        Manage modules, users, credentials, and smart city services.
                    </p>
                </div>
            </div>

            {/* USERS CRUD TABLE */}
            <section className="mt-16">

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">

                    <div>
                        <h2 className="text-3xl font-bold">
                            User Credentials
                        </h2>

                        <p className="text-gray-300 mt-2">
                            Create, Read, Update, and Delete users.
                        </p>
                    </div>

                    <button className="px-5 py-3 rounded-2xl bg-cyan-400 text-black font-semibold hover:scale-105 transition">
                        + Create User
                    </button>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl">

                    <table className="w-full min-w-[700px]">

                        <thead className="border-b border-white/10 bg-white/5">
                            <tr>
                                <th className="px-6 py-4 text-left">ID</th>
                                <th className="px-6 py-4 text-left">Username</th>
                                <th className="px-6 py-4 text-left">Password</th>
                                <th className="px-6 py-4 text-left">Role</th>
                                <th className="px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sampleUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-white/5 hover:bg-white/5 transition"
                                >
                                    <td className="px-6 py-4">{user.id}</td>

                                    <td className="px-6 py-4">
                                        {user.username}
                                    </td>

                                    <td className="px-6 py-4">
                                        {user.password}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-4 py-1 rounded-full text-xs font-semibold ${user.role === 'Admin'
                                                ? 'bg-red-500/20 text-red-300 border border-red-400/20'
                                                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/20'
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">

                                            <button className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-medium hover:scale-105 transition">
                                                Update
                                            </button>

                                            <button className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:scale-105 transition">
                                                Delete
                                            </button>

                                            <button className="px-4 py-2 rounded-xl bg-green-500 text-white font-medium hover:scale-105 transition">
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

            {/* CATEGORY CRUD TABLE */}
            <section className="mt-16">

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">

                    <div>
                        <h2 className="text-3xl font-bold">
                            Category Content Management
                        </h2>

                        <p className="text-gray-300 mt-2">
                            Manage labels and hyperlinks for each module.
                        </p>
                    </div>

                    <button className="px-5 py-3 rounded-2xl bg-purple-400 text-black font-semibold hover:scale-105 transition">
                        + Add Content
                    </button>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl">

                    <table className="w-full min-w-[900px]">

                        <thead className="border-b border-white/10 bg-white/5">
                            <tr>
                                <th className="px-6 py-4 text-left">Module</th>
                                <th className="px-6 py-4 text-left">Label</th>
                                <th className="px-6 py-4 text-left">Link</th>
                                <th className="px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {modules.map((module) =>
                                module.links.map((link, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-white/5 hover:bg-white/5 transition"
                                    >
                                        <td className="px-6 py-4">
                                            {module.title}
                                        </td>

                                        <td className="px-6 py-4">
                                            {link.label}
                                        </td>

                                        <td className="px-6 py-4">
                                            <a
                                                href={link.url}
                                                className="text-cyan-300 hover:underline"
                                            >
                                                {link.url}
                                            </a>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-2">

                                                <button className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-medium hover:scale-105 transition">
                                                    Update
                                                </button>

                                                <button className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:scale-105 transition">
                                                    Delete
                                                </button>

                                                <button className="px-4 py-2 rounded-xl bg-green-500 text-white font-medium hover:scale-105 transition">
                                                    Read
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* MODAL */}
            {selectedModule && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

                    <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#1b0f5c] p-8 shadow-2xl">

                        <div className="flex items-start justify-between gap-4 mb-6">

                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    {selectedModule.title}
                                </h2>

                                <p className="text-gray-300 mt-2">
                                    Available Links & Resources
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedModule(null)}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 transition"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">

                            {selectedModule.links.map((link: any, index: number) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 hover:bg-white/10 transition"
                                >
                                    <span className="font-medium">
                                        {link.label}
                                    </span>

                                    <span className="text-cyan-300">
                                        Open →
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}