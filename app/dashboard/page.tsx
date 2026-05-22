'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const Globe = dynamic(() => import('react-globe.gl'), {
    ssr: false,
})

export default function Dashboard() {
    const [selectedModule, setSelectedModule] = useState<any>(null)
    const globeRef = useRef<any>(null)

    const [weather, setWeather] = useState({
        temp: '29°C',
        high: '31°C',
        low: '24°C',
        condition: 'Partly Cloudy',
    })

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=14.33&longitude=121.08&current_weather=true'
                )

                const data = await res.json()

                setWeather({
                    temp: `${Math.round(data.current_weather.temperature)}°C`,
                    high: `${Math.round(
                        data.current_weather.temperature + 2
                    )}°C`,
                    low: `${Math.round(
                        data.current_weather.temperature - 3
                    )}°C`,
                    condition: 'Partly Cloudy',
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchWeather()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!globeRef.current) return

            const controls = globeRef.current.controls()

            // Smooth continuous rotation
            controls.autoRotate = true
            controls.autoRotateSpeed = 1.0

            // Keep interaction enabled
            controls.enableZoom = false
            controls.enablePan = false

            // IMPORTANT:
            // keeps rotation alive forever
            controls.enableDamping = true
            controls.dampingFactor = 0.05

            // camera focus
            globeRef.current.pointOfView({
                lat: 14.3386,
                lng: 121.0889,
                altitude: 2.2,
            })
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    const topStats = [42, 61, 95, 27]
    const alerts = [82, 56, 73, 49]

    const modules = [
        {
            id: 1,
            title: 'Command, Control and Data Center',
            short: 'CCDC',
            icon: '🖥️',
            links: [
                { label: 'Open Dashboard', url: '#' },
                { label: 'View Reports', url: '#' },
            ],
        },
        {
            id: 2,
            title: 'Social Services Distribution Management System Service',
            short: 'SSDMS',
            icon: '🤝',
            links: [
                { label: 'Beneficiaries', url: '#' },
                { label: 'Transactions', url: '#' },
            ],
        },
        {
            id: 3,
            title: 'Health Information Management System',
            short: 'HIMS',
            icon: '🏥',
            links: [
                { label: 'Patient Records', url: '#' },
                { label: 'Health Monitoring', url: '#' },
            ],
        },
        {
            id: 4,
            title: 'City Development Dynamic GIS Mapping',
            short: 'GIS',
            icon: '🗺️',
            links: [
                { label: 'GIS Dashboard', url: '#' },
                { label: 'City Mapping', url: '#' },
            ],
        },
        {
            id: 5,
            title: 'Citizen Registration Management System',
            short: 'CRMS',
            icon: '🪪',
            links: [
                { label: 'Citizen List', url: '#' },
                { label: 'Verification', url: '#' },
            ],
        },
        {
            id: 6,
            title: 'Business Permit License Office System',
            short: 'BPLO',
            icon: '🏢',
            links: [
                { label: 'Permits', url: '#' },
                { label: 'Applications', url: '#' },
            ],
        },
        {
            id: 7,
            title: 'Real Property Tax and Assessment System',
            short: 'RPTAS',
            icon: '💰',
            links: [
                { label: 'Tax Records', url: '#' },
                { label: 'Assessments', url: '#' },
            ],
        },
        {
            id: 8,
            title: 'Procurement, Asset and Inventory Management System',
            short: 'PAIMS',
            icon: '📦',
            links: [
                { label: 'Inventory', url: '#' },
                { label: 'Assets', url: '#' },
            ],
        },
        {
            id: 9,
            title: 'Accounting and Finance Information Management System',
            short: 'AFIMS',
            icon: '📊',
            links: [
                { label: 'Finance Dashboard', url: '#' },
                { label: 'Reports', url: '#' },
            ],
        },
        {
            id: 10,
            title: 'Human Resource Information Management System',
            short: 'HRIMS',
            icon: '👨‍💼',
            links: [
                { label: 'Employees', url: '#' },
                { label: 'Payroll', url: '#' },
            ],
        },
    ]

    const bars = [
        { month: 'Dec', value: 7 },
        { month: 'Nov', value: 4 },
        { month: 'Oct', value: 8 },
        { month: 'Sep', value: 6 },
        { month: 'Aug', value: 3 },
        { month: 'Jul', value: 5 },
        { month: 'Jun', value: 10 },
        { month: 'May', value: 4 },
        { month: 'Apr', value: 7 },
        { month: 'Mar', value: 9 },
        { month: 'Feb', value: 5 },
        { month: 'Jan', value: 4 },
    ]

    const stats = [
        { label: 'CCDC', value: 42, color: 'text-yellow-400' },
        { label: 'SSDMS', value: 61, color: 'text-cyan-400' },
        { label: 'HIMS', value: 95, color: 'text-lime-400' },
        { label: 'GIS', value: 27, color: 'text-orange-400' },
        { label: 'CRMS', value: 82, color: 'text-pink-400' },
        { label: 'BPLO', value: 56, color: 'text-red-400' },
        { label: 'RPTAS', value: 73, color: 'text-indigo-400' },
        { label: 'PAIMS', value: 49, color: 'text-emerald-400' },
        { label: 'AFIMS', value: 88, color: 'text-sky-400' },
        { label: 'HRIMS', value: 91, color: 'text-violet-400' },
    ]

    return (
        <main className="min-h-screen bg-[#12093b] text-white">
            <div className="mx-auto p-2">
                <div className="grid grid-cols-1 gap-2 xl:grid-cols-12">

                    {/* LEFT + CENTER */}
                    <div className="xl:col-span-9 space-y-2">

                        {/* HEADER */}
                        <div className="relative overflow-hidden rounded-md border border-[#33428f] bg-gradient-to-r from-[#101235] via-[#1b1b73] to-[#14093b]">

                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20" />

                            <div className="relative z-10 flex flex-col gap-4 p-4 sm:flex-row sm:items-center">

                                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-cyan-400 bg-black text-center text-xs font-bold">
                                    DUBAI
                                    <br />
                                    LEADING
                                </div>

                                <div>
                                    <h1 className="text-2xl font-extrabold sm:text-4xl">
                                        Smart City Management Platform
                                    </h1>

                                    <p className="mt-2 text-sm text-gray-300">
                                        Powered by Dubai Leading Technology
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CONTENT GRID */}
                        <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">

                            {/* LEFT COLUMN */}
                            <div className="space-y-2 lg:col-span-3">

                                {/* GLOBE */}
                                {/* REAL 3D GLOBE */}
                                <div className="rounded-md border border-[#33428f] bg-[#27315e] p-4">

                                    <p className="mb-4 text-center text-sm text-gray-300">
                                        Smart City Monitoring
                                    </p>

                                    <div className="relative mx-auto h-[160px] w-[160px] overflow-hidden rounded-full border border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.35)]">

                                        <Globe
                                            ref={globeRef}
                                            width={160}
                                            height={160}
                                            backgroundColor="rgba(0,0,0,0)"
                                            globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                                            bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"

                                            enablePointerInteraction={false}

                                            pointsData={[
                                                {
                                                    lat: 14.3386,
                                                    lng: 121.0889,
                                                    size: 0.3,
                                                },
                                            ]}

                                            pointLat="lat"
                                            pointLng="lng"
                                            pointAltitude={() => 0.08}
                                            pointRadius={() => 0.6}
                                            pointColor={() => 'red'}
                                        />
                                    </div>
                                </div>

                                {/* WEATHER */}
                                <div className="rounded-md border border-[#33428f] bg-[#27315e] p-4">

                                    <p className="mb-4 text-center text-sm text-gray-300">
                                        Biñan, Laguna Philippines
                                    </p>

                                    <div className="flex flex-col items-center gap-4 sm:flex-row">

                                        <div className="text-6xl">
                                            ⛅
                                        </div>

                                        <div className="flex-1">

                                            <div className="flex justify-center gap-6 sm:justify-start">

                                                <div>
                                                    <p className="text-3xl font-bold text-red-400">
                                                        {weather.high}
                                                    </p>

                                                    <p className="text-sm">
                                                        High
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-3xl font-bold text-lime-400">
                                                        {weather.low}
                                                    </p>

                                                    <p className="text-sm">
                                                        Low
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="mt-4 text-center text-xs text-gray-300 sm:text-left">
                                                {weather.condition} with {weather.temp} current temperature.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CENTER */}
                            <div className="space-y-2 lg:col-span-9">

                                {/* STATS */}
                                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-10">

                                    {stats.map((stat, i) => (
                                        <div
                                            key={i}
                                            className="rounded-md border border-[#33428f] bg-[#27315e] p-4 text-center"
                                        >
                                            <p className="text-xs text-gray-300">
                                                {stat.label}
                                            </p>

                                            <p className="mt-2 text-4xl font-bold text-white-400 bg-transparent border rounded-full px-5 py-2.5 flex justify-center">
                                                {stat.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* MAPS */}
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">

                                    <div className="h-[283px] rounded-md border border-[#33428f] bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />

                                    <div className="h-[283px] rounded-md border border-[#33428f] bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
                                </div>
                            </div>
                        </div>

                        {/* SERVICE CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">

                            {modules.map((module) => (
                                <button
                                    key={module.id}
                                    onClick={() => setSelectedModule(module)}
                                    className="group h-[220px] [perspective:1000px]"
                                >

                                    <div className="relative h-full w-full rounded-3xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                        {/* FRONT */}
                                        <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-br from-purple-700/70 to-orange-500/70 p-6 shadow-2xl [backface-visibility:hidden]">

                                            <div className="flex h-full flex-col items-center justify-center gap-4">

                                                <div className="text-6xl">
                                                    {module.icon}
                                                </div>

                                                <p className="text-xl font-bold">
                                                    {module.short}
                                                </p>
                                            </div>
                                        </div>

                                        {/* BACK */}
                                        <div className="absolute inset-0 rounded-3xl border border-cyan-400/30 bg-[#1b0f5c] p-6 shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">

                                            <div className="flex h-full items-center justify-center">

                                                <h2 className="text-center text-lg font-bold leading-relaxed text-cyan-200">
                                                    {module.title}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="space-y-2 xl:col-span-3">

                        {/* DONUT */}
                        <div className="rounded-md border border-[#33428f] bg-[#20285a] p-6">

                            <p className="mb-6 text-center text-sm text-gray-300">
                                Add Text Here
                            </p>

                            <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-lime-400 border-r-indigo-500 border-t-indigo-500 border-b-lime-400">

                                <div className="text-center">
                                    <p className="text-4xl font-bold">
                                        55%
                                    </p>

                                    <p className="text-sm text-gray-300">
                                        Lorem ipsum
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* LINE CHART */}
                        <div className="rounded-md border border-[#33428f] bg-[#20285a] p-4">

                            <p className="mb-4 text-center text-sm text-gray-300">
                                Add Text Here
                            </p>

                            <svg viewBox="0 0 300 120" className="h-[200px] w-full">

                                <polyline
                                    fill="none"
                                    stroke="#84cc16"
                                    strokeWidth="4"
                                    points="10,80 80,40 150,50 220,20 290,30"
                                />

                                <polyline
                                    fill="none"
                                    stroke="#38bdf8"
                                    strokeWidth="4"
                                    points="10,50 80,30 150,30 220,60 290,90"
                                />

                                <polyline
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="4"
                                    points="10,90 80,50 150,100 220,40 290,20"
                                />
                            </svg>
                        </div>

                        {/* BAR CHART */}
                        <div className="rounded-md border border-[#33428f] bg-[#20285a] p-4">

                            <p className="mb-6 text-center text-sm text-gray-300">
                                Add Text Here
                            </p>

                            <div className="space-y-3">

                                {bars.map((bar) => (
                                    <div
                                        key={bar.month}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="w-10 text-sm text-gray-300">
                                            {bar.month}
                                        </span>

                                        <div className="h-4 flex-1 overflow-hidden rounded bg-[#0d1438]">

                                            <div
                                                className="h-full bg-yellow-400"
                                                style={{
                                                    width: `${bar.value * 10}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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