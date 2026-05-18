import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#12093b] text-white flex items-center justify-center">
      <div className="text-center w-auto h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-6">
          Smart City Management Platform
        </h1>

        <div className="flex gap-4 justify-center">
          <Link href="/dashboard" className="bg-white text-black px-6 py-3 rounded-xl">
            Dashboard
          </Link>

          <Link href="/admin/login" className="bg-white text-black px-6 py-3 rounded-xl">
            Admin
          </Link>
        </div>
      </div>
    </main>
  )
}
