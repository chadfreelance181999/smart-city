import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#12093b] via-[#1b0f5c] to-[#2d1b75] text-white">

      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        {/* Badge */}
        <span className="mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm tracking-wide">
          Smart Technology for Modern Cities
        </span>

        {/* Heading */}
        <h1 className="max-w-4xl text-4xl md:text-6xl font-extrabold leading-tight">
          Smart City <span className="text-purple-300">Management</span> Platform
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base md:text-lg text-gray-300 leading-relaxed">
          A centralized platform designed to simplify city operations, manage
          users efficiently, and provide seamless access for administrators and citizens.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

          <Link
            href="/dashboard/login"
            className="px-8 py-4 rounded-2xl bg-white text-black font-semibold shadow-lg hover:scale-105 hover:bg-gray-200 transition-all duration-300"
          >
            Login as User
          </Link>

          <Link
            href="/admin/login"
            className="px-8 py-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            Login as Admin
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-6xl">

          <div className="p-6 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-lg shadow-xl hover:translate-y-[-5px] transition">
            <h3 className="text-xl font-semibold mb-3">User Management</h3>
            <p className="text-gray-300 text-sm">
              Easily manage users, permissions, and roles in one secure dashboard.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-lg shadow-xl hover:translate-y-[-5px] transition">
            <h3 className="text-xl font-semibold mb-3">Role Access</h3>
            <p className="text-gray-300 text-sm">
              Assign and control access levels for admins and platform users.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-lg shadow-xl hover:translate-y-[-5px] transition">
            <h3 className="text-xl font-semibold mb-3">Smart Monitoring</h3>
            <p className="text-gray-300 text-sm">
              Monitor activities and streamline smart city operations efficiently.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}