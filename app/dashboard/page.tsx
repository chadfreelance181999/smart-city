"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Bell, Menu } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DepartmentsModel } from "../generated/prisma/models";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

interface DepartmentsModelWithCount extends DepartmentsModel {
  _count: {
    reports: number;
  };
}

export default function Dashboard() {
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [departments, setDepartments] = useState<DepartmentsModelWithCount[]>(
    [],
  );
  const globeRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const [weather, setWeather] = useState({
    temp: "29°C",
    high: "31°C",
    low: "24°C",
    condition: "Partly Cloudy",
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=14.33&longitude=121.08&current_weather=true",
        );

        const data = await res.json();

        setWeather({
          temp: `${Math.round(data.current_weather.temperature)}°C`,
          high: `${Math.round(data.current_weather.temperature + 2)}°C`,
          low: `${Math.round(data.current_weather.temperature - 3)}°C`,
          condition: "Partly Cloudy",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!globeRef.current) return;

      const controls = globeRef.current.controls();

      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.0;

      controls.enableZoom = false;
      controls.enablePan = false;

      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      globeRef.current.pointOfView({
        lat: 14.3386,
        lng: 121.0889,
        altitude: 2.2,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await fetch("/api/departments");
      const departments = await res.json();
      setDepartments(departments);
      setMounted(true);
    };

    void fetchDepartments();
  }, []);

  const modules = [
    {
      id: 1,
      title: "Command, Control and Data Center",
      short: "CCDC",
      icon: "🖥️",
      links: [
        { label: "Open Dashboard", url: "#" },
        { label: "View Reports", url: "#" },
      ],
    },
    {
      id: 2,
      title: "Social Services Distribution Management System Service",
      short: "SSDMS",
      icon: "🤝",
      links: [
        { label: "Beneficiaries", url: "#" },
        { label: "Transactions", url: "#" },
      ],
    },
    {
      id: 3,
      title: "Health Information Management System",
      short: "HIMS",
      icon: "🏥",
      links: [
        { label: "Patient Records", url: "#" },
        { label: "Health Monitoring", url: "#" },
      ],
    },
    {
      id: 4,
      title: "City Development Dynamic GIS Mapping",
      short: "GIS",
      icon: "🗺️",
      links: [
        { label: "GIS Dashboard", url: "#" },
        { label: "City Mapping", url: "#" },
      ],
    },
    {
      id: 5,
      title: "Citizen Registration Management System",
      short: "CRMS",
      icon: "🪪",
      links: [
        { label: "Citizen List", url: "#" },
        { label: "Verification", url: "#" },
      ],
    },
    {
      id: 6,
      title: "Business Permit License Office System",
      short: "BPLO",
      icon: "🏢",
      links: [
        { label: "Permits", url: "#" },
        { label: "Applications", url: "#" },
      ],
    },
    {
      id: 7,
      title: "Real Property Tax and Assessment System",
      short: "RPTAS",
      icon: "💰",
      links: [
        { label: "Tax Records", url: "#" },
        { label: "Assessments", url: "#" },
      ],
    },
    {
      id: 8,
      title: "Procurement, Asset and Inventory Management System",
      short: "PAIMS",
      icon: "📦",
      links: [
        { label: "Inventory", url: "#" },
        { label: "Assets", url: "#" },
      ],
    },
    {
      id: 9,
      title: "Accounting and Finance Information Management System",
      short: "AFIMS",
      icon: "📊",
      links: [
        { label: "Finance Dashboard", url: "#" },
        { label: "Reports", url: "#" },
      ],
    },
    {
      id: 10,
      title: "Human Resource Information Management System",
      short: "HRIMS",
      icon: "👨‍💼",
      links: [
        { label: "Employees", url: "#" },
        { label: "Payroll", url: "#" },
      ],
    },
  ];

  const bars = [
    { month: "Dec", value: 7 },
    { month: "Nov", value: 4 },
    { month: "Oct", value: 8 },
    { month: "Sep", value: 6 },
    { month: "Aug", value: 3 },
    { month: "Jul", value: 5 },
    { month: "Jun", value: 7 },
    { month: "May", value: 2 },
    { month: "Apr", value: 3 },
    { month: "Mar", value: 4 },
    { month: "Feb", value: 2 },
    { month: "Jan", value: 1 },
  ];

  const stats = [
    { label: "CCDC", value: 42 },
    { label: "SSDMS", value: 61 },
    { label: "HIMS", value: 95 },
    { label: "GIS", value: 27 },
    { label: "CRMS", value: 82 },
    { label: "BPLO", value: 56 },
    { label: "RPTAS", value: 73 },
    { label: "PAIMS", value: 49 },
    { label: "AFIMS", value: 88 },
    { label: "HRIMS", value: 91 },
  ];

  const moduleColors = [
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#14b8a6",
    "#84cc16",
    "#f97316",
  ];

  const totalLinks = departments.reduce(
    (sum, department) => sum + department._count.reports,
    0,
  );

  const donutData = departments.map((department, index) => ({
    ...department,
    color: department.color,
    value: department._count.reports,
    percent: (department._count.reports / totalLinks) * 100,
  }));

  return (
    <main className="relative h-full overflow-hidden bg-[#020617] text-white">
      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="
          fixed left-[7px] top-[5px] z-[60]
          flex h-12 w-12 items-center justify-center
          rounded-xl
          border border-cyan-400/20
          bg-[#081121]/95
          text-cyan-300
          backdrop-blur-xl
          lg:hidden
        "
      >
        {mobileMenuOpen ? (
          <span className="text-xl">✕</span>
        ) : (
          <Menu size={22} />
        )}
      </button>

      {/* FLOATING SIDEBAR */}
      <div
        className={`
          fixed
          z-50
          transition-all duration-300
          left-0
          lg:left-[5px]
          lg:top-1/2
          lg:-translate-y-1/2
          lg:h-[calc(100dvh-20px)]
          h-screen

          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-[120%] lg:translate-x-0"
          }

          ${
            mobileMenuOpen ? "w-screen" : sidebarOpen ? "w-[380px]" : "w-[78px]"
          }
      `}
      >
        <div
          className="
            cyber-panel
            cyber-grid
            overflow-auto
            rounded-none lg:rounded-2xl
            border border-cyan-400/20
            bg-[#06101f]/95
            backdrop-blur-xl
            shadow-[0_0_30px_rgba(34,211,238,.15)]
            h-screen
            lg:h-[calc(100vh-20px)]
            2xl:h-auto
        "
        >
          {/* HEADER */}
          <div className="flex items-center border-b border-cyan-500/20 p-3 justify-center lg:justify-between">
            {(sidebarOpen || mobileMenuOpen) && (
              <span className="font-semibold text-2xl lg:text-xl text-cyan-300">
                Departments
              </span>
            )}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                border border-cyan-400/20
                lg:flex
                hidden
                bg-cyan-500/10
                text-cyan-300
                hover:bg-cyan-500/20
                ${sidebarOpen ? "mx-0" : "mx-auto"}
            `}
            >
              {sidebarOpen ? (
                <ChevronLeft size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          </div>

          {/* NOTIFICATION */}
          <button
            className="
              flex justify-center w-full items-center gap-3
              border-b border-cyan-500/10
              px-4 py-4
              hover:bg-cyan-500/10"
          >
            {(sidebarOpen || mobileMenuOpen) && (
              <>
                <Bell size={20} className="shrink-0 text-cyan-300" />
                <span className="flex-1 text-left text-cyan-100">
                  Notifications
                </span>
              </>
            )}
            <span
              className="
                    rounded-full
                    bg-red-500
                    px-2 py-1
                    text-xs
                    text-white
                "
            >
              {totalLinks}
            </span>
          </button>

          {/* MODULES */}
          <div className="overflow-y-auto">
            {departments.map((department) => (
              <button
                key={department.id}
                onClick={() => setSelectedModule(department)}
                className="
                  flex w-full items-center gap-3
                  px-3 py-3
                  transition-all
                  hover:bg-cyan-500/10
              "
              >
                {/* ICON */}
                <div
                  className="
                    flex h-12 w-12 shrink-0
                    items-center justify-center
                    rounded-xl
                    border border-cyan-400/20
                    bg-cyan-500/10
                    text-2xl
                 "
                >
                  {department.icon}
                </div>

                {/* EXPANDED CONTENT */}
                {(sidebarOpen || mobileMenuOpen) && (
                  <div className="flex flex-1 items-center justify-between">
                    <div className="text-left">
                      <p className="font-semibold text-cyan-100">
                        {department.subTitle}
                      </p>

                      <p className="text-xs text-cyan-100/50 line-clamp-2">
                        {department.title}
                      </p>
                    </div>

                    <span
                      className="
                        rounded-full
                        border border-cyan-400/20
                        px-2 py-1
                        text-xs
                        text-cyan-300
                    "
                    >
                      {department._count.reports}
                    </span>
                  </div>
                )}
              </button>
            ))}

            <button
              key={"departments-link"}
              onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
              className="
                flex w-full items-center gap-3
                px-3 py-3
                transition-all
                hover:bg-cyan-500/10
              "
            >
              {/* ICON */}
              <div
                className="
                  flex h-12 w-12 shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-cyan-400/20
                  bg-cyan-500/10
                  text-2xl
                "
              >
                ⬅️
              </div>

              {/* EXPANDED CONTENT */}
              {(sidebarOpen || mobileMenuOpen) && (
                <div className="flex flex-1 items-center justify-between">
                  <div className="text-left">
                    <p className="font-semibold text-cyan-100">Logout</p>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* BACKGROUND EFFECT */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.18),transparent_50%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 mx-auto p-2 lg:pl-[90px] h-auto">
        <div className="grid h-full grid-cols-1 gap-2 xl:grid-cols-12">
          {/* LEFT + CENTER */}
          <div className="flex h-full flex-col gap-2 xl:col-span-12">
            {/* HEADER */}
            <div className="cyber-panel cyber-grid relative overflow-hidden rounded-xl p-6">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{
                  backgroundImage: "url('/binan-laguna-bg.jpg')",
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20" />

              <div className="relative z-10 flex flex-col gap-4 sm:flex-row items-center lg:items-start">
                <div className="h-20 w-20">
                  <img
                    src="/smart-logo.png"
                    alt="Logo"
                    width={100}
                    height={150}
                    className="rounded-full"
                  />
                </div>

                <div>
                  <h1 className="cyber-title text-2xl font-extrabold sm:text-4xl text-center lg:text-left">
                    Smart City Management Platform
                  </h1>

                  <p className="mt-2 text-sm text-cyan-100/80 text-center lg:text-left">
                    Powered by Dubai Leading Technology
                  </p>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="grid flex-1 grid-cols-1 gap-2 lg:grid-cols-12 overflow-hidden">
              {/* LEFT */}
              <div className="order-1 xl:order-1 lg:order-1 flex flex-col gap-2 lg:col-span-6 xl:col-span-3 2xl:col-span-3 h-full">
                {/* GLOBE */}
                <div className="cyber-panel cyber-grid rounded-xl p-4">
                  <p className="mb-4 text-center text-sm text-cyan-100/80">
                    Smart City Monitoring
                  </p>

                  <div className="relative mx-auto h-[227px] w-[227px]">
                    <Globe
                      ref={globeRef}
                      width={227}
                      height={227}
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
                      pointColor={() => "#22d3ee"}
                    />
                  </div>
                </div>

                {/* BAR CHART */}
                <div className="cyber-panel cyber-grid rounded-xl p-4">
                  <p className="mb-6 text-center text-sm text-cyan-100/80">
                    Monthly Activity SSDMS
                  </p>

                  <div className="space-y-3">
                    {bars.map((bar) => (
                      <div key={bar.month} className="flex items-center gap-3">
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

              {/* CENTER */}
              <div className="order-2 xl:order-2 lg:order-3 flex flex-col gap-2 lg:col-span-12 xl:col-span-6 2xl:col-span-6 h-full">
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
                  <div className="relative flex-1 overflow-hidden rounded-xl border border-cyan-400/20 bg-[#050816] min-h-0 xl:h-[calc(87dvh-64px)] 2xl:h-[calc(79dvh-64px)] 3xl:h-[calc(61dvh-64px)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_70%)]" />

                    <TransformWrapper
                      initialScale={1.7}
                      minScale={1}
                      maxScale={8}
                      wheel={{ disabled: true }}
                      pinch={{ disabled: true }}
                      doubleClick={{ disabled: true }}
                      panning={{ disabled: true }}
                    >
                      {({ zoomIn, zoomOut, resetTransform }) => (
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
                                          outline: "none",
                                        },
                                        hover: {
                                          fill: "#1d4ed8",
                                          outline: "none",
                                        },
                                        pressed: {
                                          outline: "none",
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

                                  <circle r={18} fill="rgba(34,211,238,.15)" />

                                  <text
                                    textAnchor="middle"
                                    y={-18}
                                    className="fill-cyan-200 text-[12px] font-bold"
                                  >
                                    Biñan Laguna
                                  </text>
                                </g>
                              </Marker>
                            </ComposableMap>
                          </TransformComponent>
                        </>
                      )}
                    </TransformWrapper>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="order-3 xl:order-3 lg:order-2 flex flex-col gap-2 lg:col-span-6 xl:col-span-3 xl:justify-between 2xl:justify-start 2xl:col-span-3 h-full">
                {/* WEATHER */}
                <div className="cyber-panel cyber-grid rounded-xl p-4">
                  <p className="mb-4 text-center text-sm text-cyan-100/80">
                    Biñan, Laguna Philippines
                  </p>

                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <div className="text-6xl">⛅</div>

                    <div className="flex-1">
                      <div className="flex justify-center gap-6 sm:justify-start">
                        <div>
                          <p className="text-3xl font-bold text-red-400">
                            {weather.high}
                          </p>

                          <p className="text-sm text-cyan-100/70">High</p>
                        </div>

                        <div>
                          <p className="text-3xl font-bold text-lime-400">
                            {weather.low}
                          </p>

                          <p className="text-sm text-cyan-100/70">Low</p>
                        </div>
                      </div>

                      <p className="mt-4 text-center text-xs text-cyan-100/70 sm:text-left">
                        {weather.condition} with {weather.temp} current
                        temperature.
                      </p>
                    </div>
                  </div>
                </div>

                {/* DONUT CHART */}
                <div className="cyber-panel cyber-grid rounded-xl p-4 2xl:flex-none xl:flex-1">
                  <p className="mb-4 text-center text-sm text-cyan-100/80">
                    System Efficiency For Biñan Service Delivery
                  </p>
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-[430px]">
                      {mounted && (
                        <svg
                          viewBox="0 0 430 430"
                          className="w-full max-h-[383px] h-auto mx-auto"
                        >
                          {(() => {
                            const radius = 105;
                            const cx = 215;
                            const cy = 215;

                            const circumference = 2 * Math.PI * radius;

                            let offset = 0;

                            return donutData.map((item) => {
                              const dash = (item.percent / 100) * circumference;

                              const startAngle = (offset / circumference) * 360;

                              const middleAngle =
                                startAngle + (item.percent / 100) * 180;

                              const radians =
                                (middleAngle - 90) * (Math.PI / 180);

                              const x1 = cx + Math.cos(radians) * 100;

                              const y1 = cy + Math.sin(radians) * 100;

                              const x2 = cx + Math.cos(radians) * 130;

                              const y2 = cy + Math.sin(radians) * 130;

                              const x3 = x2 + (x2 > cx ? 45 : -45);

                              const color = item.color;

                              const segment = (
                                <g key={item.id}>
                                  {/* SLICE */}
                                  <circle
                                    cx={cx}
                                    cy={cy}
                                    r={radius}
                                    fill="none"
                                    stroke={color || ''}
                                    strokeWidth="42"
                                    strokeDasharray={`${dash} ${circumference}`}
                                    strokeDashoffset={-offset}
                                    transform={`rotate(-90 ${cx} ${cy})`}
                                    strokeLinecap="butt"
                                    className="
                                    cursor-pointer
                                    transition-all
                                    duration-300
                                    hover:opacity-80
                                  "
                                    onClick={() => setSelectedModule(item)}
                                  />

                                  {/* CONNECTOR */}
                                  <line
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke={color || ''}
                                    strokeWidth="2"
                                  />

                                  <line
                                    x1={x2}
                                    y1={y2}
                                    x2={x3}
                                    y2={y2}
                                    stroke={color || ''}
                                    strokeWidth="2"
                                  />

                                  {/* SHORT NAME */}
                                  <text
                                    x={x3 > cx ? x3 + 6 : x3 - 6}
                                    y={y2 + 3}
                                    fill="white"
                                    fontSize="11"
                                    fontWeight="600"
                                    textAnchor={x3 > cx ? "start" : "end"}
                                    className="
                                    cursor-pointer
                                    select-none
                                  "
                                    onClick={() => setSelectedModule(item)}
                                  >
                                    {item.subTitle}
                                  </text>

                                  {/* PERCENT */}
                                  <text
                                    x={x3 > cx ? x3 + 6 : x3 - 6}
                                    y={y2 + 18}
                                    fill="#94a3b8"
                                    fontSize="9"
                                    textAnchor={x3 > cx ? "start" : "end"}
                                  >
                                    {item.percent.toFixed(1)}%
                                  </text>
                                </g>
                              );

                              offset += dash;

                              return segment;
                            });
                          })()}
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mayors Weekly Reports */}
                <div className="cyber-panel cyber-grid rounded-xl p-4">
                  <p className="mb-6 text-center text-sm text-cyan-100/80">
                    Mayor's Weekly Reports
                  </p>
                  <button className="my-3 rounded-lg bg-cyan-500/10 px-4 py-2 text-cyan-100 hover:bg-cyan-500/20 block mx-auto">
                    View Weekly Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="cyber-panel cyber-grid w-full max-w-2xl rounded-3xl p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-6">
              <div className="w-[90%]">
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
              {/* {selectedModule.links.map(
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
                )} */}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
