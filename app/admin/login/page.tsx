'use client'

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-[#12093b] text-white flex items-center justify-center">
            <div className="bg-card p-8 rounded-xl w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

                <input
                    className="w-full p-3 border border-white rounded-lg mb-4 text-white"
                    placeholder="Username"
                />

                <input
                    type="password"
                    className="w-full p-3 border border-white rounded-lg mb-4 text-white"
                    placeholder="Password"
                />

                <button className="bg-accent border border-white text-white px-6 py-3 rounded-xl w-full">
                    Login
                </button>
            </div>
        </div>
    )
}
