export default function Dashboard() {
    const topStats = [42, 61, 95, 27]
    const alerts = [82, 56, 73, 49]

    const cards = [
        'Command, Control and Data Center',
        'Social Services Distribution Management System Service',
        'Health Information Management System',
        'City Development Dynamic GIS Mapping',
        'Citizen Registration Management System',
        'Business Permit License Office System',
        'Real Property Tax and Assessment System',
        'Procurement, Asset and Inventory Management System',
        'Accounting and Finance Information Management System',
        'Human Resource Information Management System',
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

    return (
        <main className="min-h-screen bg-[#12093b] text-white">
            <div className="mx-auto p-2">
                {/* MAIN GRID */}
                <div className="grid grid-cols-1 gap-2 xl:grid-cols-12">
                    {/* ================= LEFT + CENTER ================= */}
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
                                <div className="rounded-md border border-[#33428f] bg-[#27315e] p-4">
                                    <p className="mb-4 text-center text-sm text-gray-300">
                                        Add Text Here
                                    </p>

                                    <div className="mx-auto h-40 w-40 rounded-full bg-gradient-to-br from-purple-600 to-black" />
                                </div>

                                {/* WEATHER */}
                                <div className="rounded-md border border-[#33428f] bg-[#27315e] p-4">
                                    <p className="mb-4 text-center text-sm text-gray-300">
                                        Add Text Here
                                    </p>

                                    <div className="flex flex-col items-center gap-4 sm:flex-row">
                                        <div className="text-6xl">⛅</div>

                                        <div className="flex-1">
                                            <div className="flex justify-center gap-6 sm:justify-start">
                                                <div>
                                                    <p className="text-3xl font-bold text-red-400">
                                                        24°C
                                                    </p>
                                                    <p className="text-sm">High</p>
                                                </div>

                                                <div>
                                                    <p className="text-3xl font-bold text-lime-400">
                                                        20°C
                                                    </p>
                                                    <p className="text-sm">Low</p>
                                                </div>
                                            </div>

                                            <p className="mt-4 text-center text-xs text-gray-300 sm:text-left">
                                                Lorem ipsum dolor sit amet consectetur adipisicing.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CENTER */}
                            <div className="space-y-2 lg:col-span-9">
                                {/* STATS */}
                                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-8">
                                    {topStats.map((stat, i) => (
                                        <div
                                            key={i}
                                            className="rounded-md border border-[#33428f] bg-[#27315e] p-4 text-center"
                                        >
                                            <p className="text-xs text-gray-300">
                                                Add Your Text Here
                                            </p>

                                            <p className="mt-2 text-4xl font-bold text-yellow-400">
                                                {stat}
                                            </p>
                                        </div>
                                    ))}

                                    {alerts.map((alert, i) => (
                                        <div
                                            key={i}
                                            className="rounded-md border border-[#33428f] bg-[#27315e] p-4 text-center"
                                        >
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-lg font-bold">
                                                {alert}
                                            </div>

                                            <p className="mt-2 text-xs text-gray-300">
                                                Add Your Text Here
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
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">
                            {cards.map((card, i) => (
                                <div
                                    key={i}
                                    className="flex min-h-55 items-center justify-center rounded-md border border-[#33428f] bg-gradient-to-b from-[#412d8c] to-[#b6563d] p-4 text-center text-sm font-semibold leading-6"
                                >
                                    {card}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= RIGHT SIDEBAR ================= */}
                    <div className="space-y-2 xl:col-span-3">
                        {/* DONUT */}
                        <div className="rounded-md border border-[#33428f] bg-[#20285a] p-6">
                            <p className="mb-6 text-center text-sm text-gray-300">
                                Add Text Here
                            </p>

                            <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-lime-400 border-r-indigo-500 border-t-indigo-500 border-b-lime-400">
                                <div className="text-center">
                                    <p className="text-4xl font-bold">55%</p>
                                    <p className="text-sm text-gray-300">Lorem ipsum</p>
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
                                    <div key={bar.month} className="flex items-center gap-3">
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
        </main>
    )
}