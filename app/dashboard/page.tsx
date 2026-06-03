"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Bell, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  DepartmentReportsModel,
  DepartmentsModel,
  ReportMetricsModel,
} from "../generated/prisma/models";
import moment from "moment";
import { PDFViewer } from "@react-pdf/renderer";
import DocumentPreview from "./components/DocumentPreview";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

interface ReportsWithMetrics extends DepartmentReportsModel {
  metrics: ReportMetricsModel[];
}

interface DepartmentsWithReports extends DepartmentsModel {
  reports: ReportsWithMetrics[];
}

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
) as any;

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
) as any;

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
) as any;

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
}) as any;

export default function Dashboard() {
  const [selectedModule, setSelectedModule] =
    useState<DepartmentsWithReports | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMap, setActiveMap] = useState<"cctv" | "hims">("cctv");
  const [leaflet, setLeaflet] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openWeeklyBriefer, setOpenWeeklyBriefer] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [departments, setDepartments] = useState<DepartmentsWithReports[]>([]);
  const [weeklyReports, setWeeklyReports] = useState<DepartmentsWithReports[]>(
    [],
  );

  const [showPdfViewer, setShowPdfViewer] = useState(false);

  const [weeklyReportsFetched, setWeeklyReportsFetched] = useState(false);

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

    const fetchWeeklyReports = async () => {
      const res = await fetch("/api/weekly-reports");
      const weeklyReports = await res.json();
      setWeeklyReports(weeklyReports);
      setWeeklyReportsFetched(true);
    };

    void fetchDepartments();
    void fetchWeeklyReports();
  }, []);

  useEffect(() => {
    const loadLeaflet = async () => {
      // Leaflet has no bundled TypeScript declarations in this project.
      // Silence the implicit any error by treating the dynamic import as any.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const L = (await import("leaflet")) as any;
      setLeaflet(L);
    };

    loadLeaflet();
  }, []);

  const bars = [
    { month: "Dec", value: 0 },
    { month: "Nov", value: 0 },
    { month: "Oct", value: 0 },
    { month: "Sep", value: 0 },
    { month: "Aug", value: 0 },
    { month: "Jul", value: 0 },
    { month: "Jun", value: 12 },
    { month: "May", value: 97 },
    { month: "Apr", value: 100 },
    { month: "Mar", value: 100 },
    { month: "Feb", value: 100 },
    { month: "Jan", value: 100 },
  ];

  const totalLinks = departments.reduce(
    (sum, department) => sum + department.reports.length,
    0,
  );

  const donutData = departments
    .filter((department) => department.reports.length > 0)
    .map((department, index) => ({
      ...department,
      color: department.color,
      value: department.reports.length,
      percent: (department.reports.length / totalLinks) * 100,
    }));

  const cctvLocations = [
    {
      id: 1,
      name: "Biñan City Hall CCTV",
      position: [14.3386, 121.0889],
      url: "https://www.youtube.com/watch?v=Uwfh5hVJAXA",
    },
    {
      id: 2,
      name: "Biñan Plaza CCTV",
      position: [14.3362, 121.0848],
      url: "https://www.youtube.com/watch?v=Uwfh5hVJAXA",
    },
    {
      id: 3,
      name: "Southwoods Exit CCTV",
      position: [14.3014, 121.0561],
      url: "https://www.youtube.com/watch?v=Uwfh5hVJAXA",
    },
    {
      id: 4,
      name: "Poblacion CCTV",
      position: [14.3418, 121.0912],
      url: "https://www.youtube.com/watch?v=Uwfh5hVJAXA",
    },
  ];

  const createCctvIcon = (name: string) => {
    if (!leaflet) return null;

    return new leaflet.DivIcon({
      html: `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:4px;
      ">
        <div style="
          background:rgba(8,17,33,.95);
          border:1px solid rgba(34,211,238,.5);
          color:#67e8f9;
          padding:4px 8px;
          border-radius:999px;
          font-size:11px;
          font-weight:600;
          white-space:nowrap;
          box-shadow:0 0 15px rgba(34,211,238,.25);
        ">
          ${name}
        </div>

        <div style="
          width:38px;
          height:38px;
          border-radius:50%;
          background:#081121;
          border:2px solid #22d3ee;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:18px;
          box-shadow:0 0 20px rgba(34,211,238,.6);
        ">
          📹
        </div>
      </div>
    `,
      className: "",
      iconSize: [140, 60],
      iconAnchor: [70, 50],
    });
  };

  const createHealthIcon = (barangay: string) => {
    if (!leaflet) return null;

    return new leaflet.DivIcon({
      html: `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:4px;
      ">
        <div style="
          background:rgba(127,29,29,.95);
          border:1px solid rgba(239,68,68,.8);
          color:white;
          padding:4px 8px;
          border-radius:999px;
          font-size:11px;
          font-weight:600;
          white-space:nowrap;
        ">
          ${barangay}
        </div>

        <div style="
          width:38px;
          height:38px;
          border-radius:50%;
          background:#7f1d1d;
          border:2px solid #ef4444;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:18px;
          box-shadow:0 0 20px rgba(239,68,68,.8);
        ">
          🏥
        </div>
      </div>
    `,
      className: "",
      iconSize: [160, 60],
      iconAnchor: [80, 50],
    });
  };

  const barangays = [
    {
      id: 1,
      name: "Biñan (Poblacion)",
      position: [4.3373, 121.0827],
      illnesses: [
        { name: "Dengue", infected: 46 },
        { name: "Influenza", infected: 23 },
        { name: "Hypertension", infected: 58 },
      ],
    },

    {
      id: 2,
      name: "Bungahan",
      position: [14.3024, 121.0733],
      illnesses: [
        { name: "Dengue", infected: 32 },
        { name: "Influenza", infected: 18 },
        { name: "Hypertension", infected: 40 },
      ],
    },

    {
      id: 3,
      name: "Canlalay",
      position: [14.3421, 121.0719],
      illnesses: [
        { name: "Dengue", infected: 29 },
        { name: "Diabetes", infected: 20 },
        { name: "Influenza", infected: 17 },
      ],
    },

    {
      id: 4,
      name: "Casile",
      position: [14.3434, 121.0886],
      illnesses: [
        { name: "Dengue", infected: 11 },
        { name: "Influenza", infected: 8 },
        { name: "Hypertension", infected: 15 },
      ],
    },

    {
      id: 5,
      name: "De La Paz",
      position: [14.3487, 121.0848],
      illnesses: [
        { name: "Dengue", infected: 37 },
        { name: "Diabetes", infected: 16 },
        { name: "Hypertension", infected: 43 },
      ],
    },

    {
      id: 6,
      name: "Ganado",
      position: [14.2848, 121.0804],
      illnesses: [
        { name: "Dengue", infected: 18 },
        { name: "Influenza", infected: 14 },
        { name: "Hypertension", infected: 31 },
      ],
    },

    {
      id: 7,
      name: "Langkiwa",
      position: [14.2997, 121.0592],
      illnesses: [
        { name: "Dengue", infected: 21 },
        { name: "Diabetes", infected: 11 },
        { name: "Influenza", infected: 10 },
      ],
    },

    {
      id: 8,
      name: "Loma",
      position: [14.2874, 121.0662],
      illnesses: [
        { name: "Dengue", infected: 25 },
        { name: "Influenza", infected: 19 },
        { name: "Hypertension", infected: 34 },
      ],
    },

    {
      id: 9,
      name: "Malaban",
      position: [14.3464, 121.0889],
      illnesses: [
        { name: "Dengue", infected: 27 },
        { name: "Diabetes", infected: 12 },
        { name: "Influenza", infected: 14 },
      ],
    },

    {
      id: 10,
      name: "Malamig",
      position: [14.278, 121.0532],
      illnesses: [
        { name: "Dengue", infected: 20 },
        { name: "Influenza", infected: 15 },
        { name: "Hypertension", infected: 26 },
      ],
    },

    {
      id: 11,
      name: "Mampalasan",
      position: [14.2916, 121.0784],
      illnesses: [
        { name: "Dengue", infected: 34 },
        { name: "Diabetes", infected: 15 },
        { name: "Influenza", infected: 21 },
      ],
    },

    {
      id: 12,
      name: "Platero",
      position: [14.321, 121.0921],
      illnesses: [
        { name: "Dengue", infected: 41 },
        { name: "Influenza", infected: 20 },
        { name: "Hypertension", infected: 52 },
      ],
    },

    {
      id: 13,
      name: "Poblacion",
      position: [14.3389, 121.0839],
      illnesses: [
        { name: "Dengue", infected: 49 },
        { name: "Influenza", infected: 31 },
        { name: "Hypertension", infected: 60 },
      ],
    },

    {
      id: 14,
      name: "San Antonio",
      position: [14.3362, 121.0883],
      illnesses: [
        { name: "Dengue", infected: 28 },
        { name: "Diabetes", infected: 17 },
        { name: "Influenza", infected: 15 },
      ],
    },

    {
      id: 15,
      name: "San Francisco (Halang)",
      position: [14.3333, 121.0561],
      illnesses: [
        { name: "Dengue", infected: 44 },
        { name: "Influenza", infected: 22 },
        { name: "Hypertension", infected: 47 },
      ],
    },

    {
      id: 16,
      name: "San Jose",
      position: [14.3436, 121.0824],
      illnesses: [
        { name: "Dengue", infected: 30 },
        { name: "Diabetes", infected: 13 },
        { name: "Influenza", infected: 19 },
      ],
    },

    {
      id: 17,
      name: "San Vicente",
      position: [14.3312, 121.0798],
      illnesses: [
        { name: "Dengue", infected: 33 },
        { name: "Influenza", infected: 24 },
        { name: "Hypertension", infected: 45 },
      ],
    },

    {
      id: 18,
      name: "Santo Domingo",
      position: [14.3359, 121.082],
      illnesses: [
        { name: "Dengue", infected: 26 },
        { name: "Diabetes", infected: 14 },
        { name: "Influenza", infected: 18 },
      ],
    },

    {
      id: 19,
      name: "Santo Niño",
      position: [14.3305, 121.0858],
      illnesses: [
        { name: "Dengue", infected: 35 },
        { name: "Influenza", infected: 21 },
        { name: "Hypertension", infected: 41 },
      ],
    },

    {
      id: 20,
      name: "Santo Tomas",
      position: [14.3112, 121.0638],
      illnesses: [
        { name: "Dengue", infected: 16 },
        { name: "Influenza", infected: 12 },
        { name: "Hypertension", infected: 22 },
      ],
    },

    {
      id: 21,
      name: "Soro-Soro",
      position: [14.3255, 121.0615],
      illnesses: [
        { name: "Dengue", infected: 24 },
        { name: "Diabetes", infected: 10 },
        { name: "Influenza", infected: 16 },
      ],
    },

    {
      id: 22,
      name: "Timbao",
      position: [14.2825, 121.0547],
      illnesses: [
        { name: "Dengue", infected: 39 },
        { name: "Influenza", infected: 27 },
        { name: "Hypertension", infected: 49 },
      ],
    },

    {
      id: 23,
      name: "Tubigan",
      position: [14.3298, 121.07],
      illnesses: [
        { name: "Dengue", infected: 22 },
        { name: "Diabetes", infected: 9 },
        { name: "Influenza", infected: 13 },
      ],
    },

    {
      id: 24,
      name: "Zapote",
      position: [14.3175, 121.0813],
      illnesses: [
        { name: "Dengue", infected: 36 },
        { name: "Influenza", infected: 25 },
        { name: "Hypertension", infected: 44 },
      ],
    },
  ];

  type LatLngTuple = [number, number];
  const center: LatLngTuple = [14.3386, 121.0889];

  return (
    <main className="relative h-full min-h-0 overflow-hidden bg-[#020617] text-white">
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

                    {department.reports.length > 0 && (
                      <span
                        className="
                        rounded-full
                        border border-cyan-400/20
                        px-2 py-1
                        text-xs
                        text-cyan-300
                    "
                      >
                        {department.reports.length}
                      </span>
                    )}
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
          <div className="flex flex-col gap-2 xl:col-span-12 min-h-screen lg:min-h-[98dvh]">
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
                    Monthly Distribution Completion Rate (SSDMS)
                  </p>

                  <div className="space-y-3">
                    {bars.map((bar) => (
                      <div key={bar.month} className="flex items-center gap-3">
                        <span className="w-10 text-sm text-cyan-100/70">
                          {bar.month}
                        </span>

                        <div className="relative h-5 flex-1 overflow-hidden rounded-md bg-[#0d1438] border border-cyan-500/10">
                          {/* Progress Fill */}
                          {bar.value > 0 && (
                            <div
                              className="flex h-full items-center justify-end rounded-md bg-gradient-to-r from-cyan-400 to-blue-600 pr-2 transition-all duration-700 ease-out"
                              style={{
                                width: `${bar.value}%`,
                              }}
                            >
                              <span className="text-xs font-semibold text-white">
                                {bar.value}%
                              </span>
                            </div>
                          )}

                          {/* Upcoming Months */}
                          {bar.value === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-medium tracking-wide text-cyan-100/60">
                                Upcoming
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CENTER */}
              <div className="order-2 xl:order-2 lg:order-3 flex flex-col gap-2 lg:col-span-12 xl:col-span-6 2xl:col-span-6 h-full lg:h-full 2xl:h-[83vh!important] min-h-0">
                <div className="cyber-panel cyber-grid relative rounded-xl p-4 flex flex-col h-full min-h-0">
                  {/* HEADER */}
                  <div className="mb-4 flex flex-col gap-3">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h2 className="cyber-title text-xl font-bold md:text-2xl">
                          {activeMap === "cctv"
                            ? "Smart City CCTV Monitoring"
                            : "Health Information Management System"}
                        </h2>

                        <p className="text-sm text-cyan-200/70">
                          {activeMap === "cctv"
                            ? "Live Geographic Intelligence System"
                            : "Barangay Health Surveillance System"}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs text-cyan-300">
                          Biñan Laguna
                        </div>

                        <div
                          className={`rounded-full px-4 py-2 text-xs border border-lime-400/30 bg-lime-500/10 text-lime-300"`}
                        >
                          {activeMap === "cctv"
                            ? `${cctvLocations.length} CCTV Online`
                            : `${barangays.length} Barangays Monitored`}
                        </div>
                      </div>
                    </div>

                    {/* MAP SELECTOR */}
                    <details className="rounded-lg border border-cyan-400/20 bg-[#081121]/80 lg:w-[50%] w-full">
                      <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-cyan-300">
                        Select Monitoring System
                      </summary>

                      <div className="flex flex-col gap-2 p-3">
                        <button
                          onClick={() => setActiveMap("cctv")}
                          className={`rounded-lg px-4 py-2 text-left text-sm transition ${
                            activeMap === "cctv"
                              ? "bg-cyan-600 text-white"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          📹 Smart City CCTV Monitoring
                        </button>

                        <button
                          onClick={() => setActiveMap("hims")}
                          className={`rounded-lg px-4 py-2 text-left text-sm transition ${
                            activeMap === "hims"
                              ? "bg-cyan-600 text-white"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          🏥 Health Information Management System
                        </button>
                      </div>
                    </details>
                  </div>

                  {/* MAP */}
                  <div className="relative flex-1 overflow-hidden rounded-xl border border-cyan-400/20 bg-[#050816]">
                    <MapContainer
                      center={center}
                      zoom={13}
                      scrollWheelZoom={true}
                      className="h-[500px] xl:h-full w-full z-0"
                    >
                      <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      {/* CCTV MAP */}
                      {activeMap === "cctv" &&
                        cctvLocations.map((camera) => (
                          <Marker
                            key={camera.id}
                            position={camera.position as [number, number]}
                            icon={createCctvIcon(camera.name)}
                          >
                            <Popup>
                              <div className="space-y-2 min-w-[180px]">
                                <h3 className="font-semibold">{camera.name}</h3>

                                <button
                                  onClick={() =>
                                    window.open(
                                      camera.url,
                                      "_blank",
                                      "noopener,noreferrer",
                                    )
                                  }
                                  className="rounded bg-cyan-600 px-3 py-1 text-white text-sm"
                                >
                                  View Live CCTV Footage
                                </button>
                              </div>
                            </Popup>
                          </Marker>
                        ))}

                      {/* HIMS MAP */}
                      {activeMap === "hims" &&
                        barangays.map((barangay) => (
                          <Marker
                            key={barangay.id}
                            position={barangay.position as [number, number]}
                            icon={createHealthIcon(barangay.name)}
                          >
                            <Popup>
                              <div className="min-w-[220px] space-y-3">
                                <h3 className="font-semibold text-red-600">
                                  {barangay.name}
                                </h3>

                                <div className="text-sm font-medium">
                                  Common Illness Cases
                                </div>

                                <ul className="space-y-1 text-sm">
                                  {barangay.illnesses.map((illness) => (
                                    <li key={illness.name}>
                                      • {illness.name} ({illness.infected})
                                    </li>
                                  ))}
                                </ul>

                                <button
                                  onClick={() =>
                                    window.open(
                                      "/health-dashboard",
                                      "_blank",
                                      "noopener,noreferrer",
                                    )
                                  }
                                  className="rounded bg-red-600 px-3 py-1 text-white text-sm"
                                >
                                  View Health Dashboard
                                </button>
                              </div>
                            </Popup>
                          </Marker>
                        ))}
                    </MapContainer>

                    {/* OVERLAY */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_70%)]" />

                    {/* LEGEND */}
                    <div className="absolute bottom-4 left-4 z-[1000] rounded-lg border border-cyan-400/30 bg-[#081121]/90 px-4 py-3 backdrop-blur">
                      <div className="mb-2 text-xs font-semibold text-cyan-300">
                        {activeMap === "cctv"
                          ? "CCTV STATUS"
                          : "HEALTH SURVEILLANCE"}
                      </div>

                      {activeMap === "cctv" ? (
                        <div className="flex items-center gap-2 text-xs text-white">
                          <span className="h-3 w-3 rounded-full bg-lime-500" />
                          Active Camera
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-xs text-white">
                          <span className="h-3 w-3 rounded-full bg-lime-500" />
                          Barangay Health Data
                        </div>
                      )}
                    </div>
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
                                    stroke={color || ""}
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
                                    stroke={color || ""}
                                    strokeWidth="2"
                                  />

                                  <line
                                    x1={x2}
                                    y1={y2}
                                    x2={x3}
                                    y2={y2}
                                    stroke={color || ""}
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

                {/* Mayors Weekly Briefer */}
                <div className="cyber-panel cyber-grid rounded-xl p-4">
                  <p className="mb-6 text-center text-sm text-cyan-100/80">
                    Mayor's Weekly Briefer
                  </p>

                  <button
                    onClick={() => setOpenWeeklyBriefer(true)}
                    disabled={!weeklyReportsFetched}
                    className="my-3 rounded-lg bg-cyan-500/10 px-4 py-2 text-cyan-100 hover:bg-cyan-500/20 block mx-auto"
                  >
                    View Weekly Briefer
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
              {selectedModule.link && (
                <a
                  key={"department-link" + selectedModule.id}
                  href={selectedModule.link}
                  target="_blank"
                  className="flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-500/5 px-5 py-4 transition hover:bg-cyan-500/10"
                >
                  <span className="font-medium text-cyan-100">
                    Open Dashboard
                  </span>

                  <span className="text-cyan-300">Open →</span>
                </a>
              )}

              {selectedModule.reports.map((report) => (
                <a
                  key={"department-report" + report.id}
                  href={report.url || "#"}
                  target="_blank"
                  className="flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-500/5 px-5 py-4 transition hover:bg-cyan-500/10"
                >
                  <span className="font-medium text-cyan-100">
                    {report.title}
                  </span>

                  <span className="text-cyan-300">Open →</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Weekly Briefer MODAL */}
      {openWeeklyBriefer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="cyber-panel cyber-grid w-full max-w-2xl rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 p-6">
              <div>
                <h2 className="text-3xl font-bold text-cyan-100">
                  Mayor's Weekly Briefer
                </h2>
                <p className="text-cyan-300/70">Available Links & Resources</p>
                <p className="text-cyan-300/70">
                  {moment().isoWeekday(1).format("MMMM DD, YYYY")} -{" "}
                  {moment().isoWeekday(5).endOf("day").format("MMMM DD, YYYY")}
                </p>

               
              </div>

              <button
                onClick={() => setOpenWeeklyBriefer(false)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-2xl text-cyan-100 hover:bg-cyan-500/20"
              >
                ×
              </button>
            </div>

             <button
                  onClick={() => setShowPdfViewer(true)}
                  className="block mx-auto mt-4 rounded-lg bg-cyan-500/10 px-4 py-2 text-cyan-100 hover:bg-cyan-500/20"
                >
                  View PDF Preview
                </button>

            {/* Content */}
            <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">
              {weeklyReports.map((department) => (
                <div
                  key={"department-" + department.id}
                  className="rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-4"
                >
                  <h3 className="mb-4 text-lg font-semibold text-cyan-300">
                    {department.title}
                  </h3>

                  <div className="space-y-3">
                    {department.reports.map((report) => {
                      const key = `${department.id}-${report.id}`;

                      return (
                        <div
                          key={key}
                          className="rounded-lg border border-cyan-500/10"
                        >
                          <button
                            onClick={() =>
                              setOpenAccordion(
                                openAccordion === key ? null : key,
                              )
                            }
                            className="flex w-full items-center justify-between p-4 text-left"
                          >
                            <a
                              href={report.url || ""}
                              target="_blank"
                              className="font-medium text-cyan-200 underline"
                            >
                              {report.title}
                            </a>

                            <span>{openAccordion === key ? "−" : "+"}</span>
                          </button>

                          {openAccordion === key && (
                            <div className="border-t border-cyan-500/10 p-4">
                              <ul className="space-y-2">
                                {report.metrics.map((metric) => (
                                  <li
                                    key={"metric" + metric}
                                    className="flex justify-between text-sm"
                                  >
                                    <span className="text-cyan-100/80">
                                      {metric.name}
                                    </span>

                                    <span className="font-medium text-cyan-300">
                                      {metric.value}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {showPdfViewer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="cyber-panel cyber-grid w-full max-w-3xl rounded-3xl p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-6">
              <div className="w-[90%]">
                <h2 className="text-2xl font-bold text-cyan-100 md:text-3xl">
                  Mayor's Weekly Briefer - Preview
                </h2>
              </div>

              <button
                onClick={() => setShowPdfViewer(false)}
                className="h-10 w-10 rounded-full bg-cyan-500/10 transition hover:bg-red-500"
              >
                ✕
              </button>
            </div>

            <div className="h-[70vh]">
              <PDFViewer width="100%" height="100%">
                <DocumentPreview departments={weeklyReports} />
              </PDFViewer>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
