'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from 'react-simple-maps'

import {
    TransformWrapper,
    TransformComponent,
} from 'react-zoom-pan-pinch'

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

            controls.autoRotate = true
            controls.autoRotateSpeed = 1.0

            controls.enableZoom = false
            controls.enablePan = false

            controls.enableDamping = true
            controls.dampingFactor = 0.05

            globeRef.current.pointOfView({
                lat: 14.3386,
                lng: 121.0889,
                altitude: 2.2,
            })
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

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
        { month: 'Jun', value: 7 },
        { month: 'May', value: 2 },
        { month: 'Apr', value: 3 },
        { month: 'Mar', value: 4 },
        { month: 'Feb', value: 2 },
        { month: 'Jan', value: 1 },
    ]

    const stats = [
        { label: 'CCDC', value: 42 },
        { label: 'SSDMS', value: 61 },
        { label: 'HIMS', value: 95 },
        { label: 'GIS', value: 27 },
        { label: 'CRMS', value: 82 },
        { label: 'BPLO', value: 56 },
        { label: 'RPTAS', value: 73 },
        { label: 'PAIMS', value: 49 },
        { label: 'AFIMS', value: 88 },
        { label: 'HRIMS', value: 91 },
    ]

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

            {/* BACKGROUND EFFECT */}
            <div className="pointer-events-none absolute inset-0">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.18),transparent_50%)]" />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className="relative z-10 mx-auto p-2">

                <div className="grid grid-cols-1 gap-2 xl:grid-cols-12">

                    {/* LEFT + CENTER */}
                    <div className="space-y-2 xl:col-span-12">

                        {/* HEADER */}
                        <div className="cyber-panel cyber-grid relative overflow-hidden rounded-xl p-6">

                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />

                            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center">

                                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyan-400 bg-black/50 text-center text-xs font-bold text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,.5)]">
                                    SMART
                                    <br />
                                    CITY
                                </div>

                                <div>
                                    <h1 className="cyber-title text-2xl font-extrabold sm:text-4xl">
                                        Smart City Management Platform
                                    </h1>

                                    <p className="mt-2 text-sm text-cyan-100/80">
                                        Powered by Dubai Leading Technology
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">

                            {/* LEFT */}
                            <div className="space-y-2 lg:col-span-3">

                                {/* GLOBE */}
                                <div className="cyber-panel cyber-grid rounded-xl p-4">

                                    <p className="mb-4 text-center text-sm text-cyan-100/80">
                                        Smart City Monitoring
                                    </p>

                                    <div className="relative mx-auto h-[205px] w-[205px]">

                                        <Globe
                                            ref={globeRef}
                                            width={205}
                                            height={205}
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
                                            pointColor={() => '#22d3ee'}
                                        />
                                    </div>
                                </div>

                                {/* WEATHER */}
                                <div className="cyber-panel cyber-grid rounded-xl p-4">

                                    <p className="mb-4 text-center text-sm text-cyan-100/80">
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

                                                    <p className="text-sm text-cyan-100/70">
                                                        High
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-3xl font-bold text-lime-400">
                                                        {weather.low}
                                                    </p>

                                                    <p className="text-sm text-cyan-100/70">
                                                        Low
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="mt-4 text-center text-xs text-cyan-100/70 sm:text-left">
                                                {weather.condition} with {weather.temp} current temperature.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* LINE CHART */}
                                <div className="cyber-panel cyber-grid rounded-xl p-4">

                                    <p className="mb-4 text-center text-sm text-cyan-100/80">
                                        Mayor's Weekly Reports
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
                            </div>

                            {/* CENTER */}
                            <div className="space-y-2 lg:col-span-6">

                                {/* STATS */}
                                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10">

                                    {stats.map((stat, i) => (
                                        <div
                                            key={i}
                                            className="cyber-panel cyber-grid rounded-xl p-4 text-center transition hover:scale-[1.02]"
                                        >
                                            <p className="text-xs text-cyan-100/80">
                                                {stat.label}
                                            </p>

                                            <p className="mt-3 flex justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-3xl font-bold text-cyan-300">
                                                {stat.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* FUTURISTIC WORLD MAP */}
                                <div className="cyber-panel cyber-grid relative rounded-xl p-4">

                                    {/* TOP */}
                                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                                        <div>
                                            <h2 className="cyber-title text-xl font-bold md:text-2xl">
                                                Global Smart City Monitoring
                                            </h2>

                                            <p className="text-sm text-cyan-200/70">
                                                Live Geographic Intelligence System
                                            </p>
                                        </div>

                                        <div className="flex gap-2">
                                            <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs text-cyan-300">
                                                Biñan Laguna Active
                                            </div>

                                            <div className="rounded-full border border-lime-400/30 bg-lime-500/10 px-4 py-2 text-xs text-lime-300">
                                                Online
                                            </div>
                                        </div>
                                    </div>

                                    {/* MAP */}
                                    <div className="relative h-[500px] overflow-hidden rounded-xl border border-cyan-400/20 bg-[#050816]">

                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_70%)]" />

                                        <TransformWrapper
                                            initialScale={1.7}
                                            minScale={1}
                                            maxScale={8}
                                        >
                                            {({
                                                zoomIn,
                                                zoomOut,
                                                resetTransform,
                                            }) => (
                                                <>
                                                    {/* CONTROLS */}
                                                    <div className="absolute right-4 top-4 z-50 flex flex-col gap-2">

                                                        <button
                                                            onClick={() => zoomIn()}
                                                            className="h-10 w-10 rounded-lg border border-cyan-400/30 bg-[#081121]/80 text-cyan-300 backdrop-blur hover:bg-cyan-500/20"
                                                        >
                                                            +
                                                        </button>

                                                        <button
                                                            onClick={() => zoomOut()}
                                                            className="h-10 w-10 rounded-lg border border-cyan-400/30 bg-[#081121]/80 text-cyan-300 backdrop-blur hover:bg-cyan-500/20"
                                                        >
                                                            −
                                                        </button>

                                                        <button
                                                            onClick={() => resetTransform()}
                                                            className="rounded-lg border border-cyan-400/30 bg-[#081121]/80 px-3 py-2 text-xs text-cyan-300 backdrop-blur hover:bg-cyan-500/20"
                                                        >
                                                            RESET
                                                        </button>
                                                    </div>

                                                    <TransformComponent
                                                        wrapperClass="!w-full !h-full"
                                                        contentClass="!w-full !h-full"
                                                    >
                                                        <ComposableMap
                                                            projection="geoMercator"
                                                            className="h-full w-full"
                                                            projectionConfig={{
                                                                scale: 160,
                                                                center: [121.08, 14.33],
                                                            }}
                                                        >
                                                            <ZoomableGroup>

                                                                <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">

                                                                    {({ geographies }: { geographies: any[] }) =>
                                                                        geographies.map((geo: any) => (
                                                                            <Geography
                                                                                key={geo.rsmKey}
                                                                                geography={geo}
                                                                                fill="#0f2d52"
                                                                                stroke="#38bdf8"
                                                                                strokeWidth={0.4}
                                                                                style={{
                                                                                    default: {
                                                                                        outline: 'none',
                                                                                    },
                                                                                    hover: {
                                                                                        fill: '#1d4ed8',
                                                                                        outline: 'none',
                                                                                    },
                                                                                    pressed: {
                                                                                        outline: 'none',
                                                                                    },
                                                                                }}
                                                                            />
                                                                        ))
                                                                    }
                                                                </Geographies>

                                                                {/* PIN */}
                                                                <Marker coordinates={[121.08, 14.33]}>

                                                                    <g className="pin-pulse">

                                                                        <circle
                                                                            r={8}
                                                                            fill="#06b6d4"
                                                                            stroke="#67e8f9"
                                                                            strokeWidth={2}
                                                                        />

                                                                        <circle
                                                                            r={18}
                                                                            fill="rgba(34,211,238,.15)"
                                                                        />

                                                                        <text
                                                                            textAnchor="middle"
                                                                            y={-18}
                                                                            className="fill-cyan-200 text-[12px] font-bold"
                                                                        >
                                                                            Biñan Laguna
                                                                        </text>
                                                                    </g>
                                                                </Marker>
                                                            </ZoomableGroup>
                                                        </ComposableMap>
                                                    </TransformComponent>
                                                </>
                                            )}
                                        </TransformWrapper>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDEBAR */}
                            <div className="space-y-2 xl:col-span-3">

                                {/* DONUT */}
                                <div className="cyber-panel cyber-grid rounded-xl p-6">

                                    <p className="mb-6 text-center text-sm text-cyan-100/80">
                                        System Efficiency
                                    </p>

                                    <div className="relative mx-auto flex h-[174px] w-[174px] items-center justify-center rounded-full border-[14px] border-cyan-400 border-r-blue-600 border-t-blue-600 border-b-cyan-400 shadow-[0_0_25px_rgba(34,211,238,.3)]">

                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-cyan-300">
                                                55%
                                            </p>

                                            <p className="text-sm text-cyan-100/70">
                                                Active
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* BAR CHART */}
                                <div className="cyber-panel cyber-grid rounded-xl p-4">

                                    <p className="mb-6 text-center text-sm text-cyan-100/80">
                                        Monthly Activity
                                    </p>

                                    <div className="space-y-3">

                                        {bars.map((bar) => (
                                            <div
                                                key={bar.month}
                                                className="flex items-center gap-3"
                                            >

                                                <span className="w-10 text-sm text-cyan-100/70">
                                                    {bar.month}
                                                </span>

                                                <div className="h-4 flex-1 overflow-hidden rounded bg-[#0d1438]">

                                                    <div
                                                        className="h-full rounded bg-gradient-to-r from-cyan-400 to-blue-600"
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

                        {/* MODULES */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

                            {modules.map((module) => (
                                <button
                                    key={module.id}
                                    onClick={() => setSelectedModule(module)}
                                    className="group h-[220px] [perspective:1000px]"
                                >

                                    <div className="relative h-full w-full rounded-3xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                        {/* FRONT */}
                                        <div className="absolute inset-0 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-6 shadow-2xl backdrop-blur-xl [backface-visibility:hidden]">

                                            <div className="flex h-full flex-col items-center justify-center gap-4">

                                                <div className="text-6xl">
                                                    {module.icon}
                                                </div>

                                                <p className="text-xl font-bold text-cyan-100">
                                                    {module.short}
                                                </p>
                                            </div>
                                        </div>

                                        {/* BACK */}
                                        <div className="absolute inset-0 rounded-3xl border border-cyan-400/30 bg-[#081121] p-6 shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">

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


                </div>
            </div>

            {/* MODAL */}
            {selectedModule && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

                    <div className="cyber-panel cyber-grid w-full max-w-2xl rounded-3xl p-8 shadow-2xl">

                        <div className="mb-6 flex items-start justify-between gap-4">

                            <div>
                                <h2 className="text-2xl font-bold text-cyan-100 md:text-3xl">
                                    {selectedModule.title}
                                </h2>

                                <p className="mt-2 text-cyan-100/70">
                                    Available Links & Resources
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedModule(null)}
                                className="h-10 w-10 rounded-full bg-cyan-500/10 transition hover:bg-red-500"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">

                            {selectedModule.links.map(
                                (link: any, index: number) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        className="flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-500/5 px-5 py-4 transition hover:bg-cyan-500/10"
                                    >

                                        <span className="font-medium text-cyan-100">
                                            {link.label}
                                        </span>

                                        <span className="text-cyan-300">
                                            Open →
                                        </span>
                                    </a>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}