"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Bell, Menu } from "lucide-react";
import { signOut } from "next-auth/react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leaflet, setLeaflet] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openWeeklyBriefer, setOpenWeeklyBriefer] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
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


  const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false },
  );

  const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false },
  );

  const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false },
  );

  const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false },
  );

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

  const weeklyBrieferData = [
    {
      department: "CCDC (Command, Control and Data Center)",
      reports: [
        {
          title: "City Systems Availability",
          href: "https://docs.google.com/document/d/1zZswe33Dav0ecrqa2guDspnY1ku2hHpxrDRgoSUc8fU/edit?usp=sharing",
          metrics: {
            "Average Uptime": "99.8%",
            "Lowest Monthly Uptime": "97.6%",
            "Highest Monthly Uptime": "100%",
            "Systems Monitored": "42",
            "Active CCTV Cameras": "685",
          },
        },
        {
          title: "Emergency & Incident Response",
          href: "#",
          metrics: {
            "Average Response Time": "3.8 mins",
            "Fastest Response": "45 secs",
            "Longest Response": "14 mins",
            "Total Incidents Resolved": "1,245",
            "Resolution Rate": "98%",
          },
        },
      ],
    },

    {
      department: "SSDMS (Social Services Distribution Management System)",
      reports: [
        {
          title: "Social Assistance Distribution",
          href: "#",
          metrics: {
            "Beneficiaries Served": "14,250",
            "Average Assistance Released": "₱4,200",
            "Distribution Completion Rate": "97%",
            "Barangays Completed": "24 / 24",
            "Total Assistance Released": "₱59.8M",
          },
        },
        {
          title: "Assistance Application Processing",
          href: "#",
          metrics: {
            "Average Processing Time": "2.8 days",
            "Fastest Processing": "6 hours",
            "Longest Processing": "9 days",
            "Application Approval Rate": "94%",
            "Applications Processed": "15,160",
          },
        },
      ],
    },

    {
      department: "HIMS (Health Information Management System)",
      reports: [
        {
          title: "Public Health Consultations",
          href: "#",
          metrics: {
            "Average Daily Patients": "870",
            "Lowest Daily Count": "420",
            "Highest Daily Count": "1,340",
            "Monthly Consultations": "26,100",
            "Vaccination Coverage": "93%",
          },
        },
        {
          title: "Health Facility Utilization",
          href: "#",
          metrics: {
            "Average Bed Occupancy": "82%",
            "Lowest Occupancy": "58%",
            "Highest Occupancy": "99%",
            "Available Beds": "520",
            "Emergency Response Rate": "96%",
          },
        },
      ],
    },

    {
      department: "GIS (City Development Dynamic GIS Mapping)",
      reports: [
        {
          title: "Barangay Mapping Coverage",
          href: "#",
          metrics: {
            "Mapped Areas": "96%",
            "Lowest Barangay Coverage": "78%",
            "Highest Coverage": "100%",
            "Roads Digitized": "1,280 km",
            "Infrastructure Assets Tagged": "18,450",
          },
        },
        {
          title: "Land Use Distribution",
          href: "#",
          metrics: {
            "Residential Areas": "48%",
            "Industrial Areas": "27%",
            "Commercial & Institutional Areas": "25%",
            "Total Mapped Land Area": "4,350 hectares",
            "Zoning Compliance Rate": "92%",
          },
        },
      ],
    },

    {
      department: "CRMS (Citizen Registration Management System)",
      reports: [
        {
          title: "Resident Registration Overview",
          href: "#",
          metrics: {
            "Registered Residents": "312,450",
            "Average Daily Registrations": "520",
            "Peak Registrations": "1,120",
            "Active Records": "98%",
            "New Registrations This Year": "18,600",
          },
        },
        {
          title: "Population Demographics",
          href: "#",
          metrics: {
            Male: "49.2%",
            Female: "50.3%",
            Others: "0.5%",
            "Working Age Population": "64%",
            "Senior Citizens": "9%",
          },
        },
      ],
    },

    {
      department: "BPLO (Business Permit License Office System)",
      reports: [
        {
          title: "Business Permit Applications",
          href: "#",
          metrics: {
            "Applications Received": "8,950",
            "Approval Rate": "93%",
            "Rejection Rate": "7%",
            "New Businesses Registered": "1,850",
            "Renewals Processed": "7,100",
          },
        },
        {
          title: "Permit Processing Performance",
          href: "#",
          metrics: {
            "Average Processing Time": "1.9 days",
            "Fastest Approval": "2 hours",
            "Longest Approval": "8 days",
            "Same-Day Approvals": "68%",
            "Customer Satisfaction Rate": "96%",
          },
        },
      ],
    },

    {
      department: "RPTAS (Real Property Tax and Assessment System)",
      reports: [
        {
          title: "Real Property Tax Collection",
          href: "#",
          metrics: {
            "Total Collection": "₱485M",
            "Collection Efficiency Rate": "89%",
            "Highest Monthly Collection": "₱56M",
            "Delinquency Rate": "11%",
            "Collection Growth": "8.5%",
          },
        },
        {
          title: "Property Assessment Statistics",
          href: "#",
          metrics: {
            "Assessed Properties": "84,600",
            "Average Property Value": "₱2.9M",
            "Highest Assessed Property": "₱180M",
            "Newly Assessed Properties": "3,450",
            "Assessment Completion Rate": "95%",
          },
        },
      ],
    },

    {
      department: "PAIMS (Procurement, Asset and Inventory Management System)",
      reports: [
        {
          title: "Government Asset Inventory",
          href: "#",
          metrics: {
            "Total Assets": "24,850",
            "Available Assets": "92%",
            "Assets Under Maintenance": "8%",
            "Asset Utilization Rate": "88%",
            "ICT Assets Recorded": "5,620",
          },
        },
        {
          title: "Procurement Cycle Monitoring",
          href: "#",
          metrics: {
            "Completed Requests": "96%",
            "Average Procurement Duration": "6 days",
            "Longest Procurement Cycle": "24 days",
            "Active Purchase Requests": "185",
            "Procurement Savings": "₱12.5M",
          },
        },
      ],
    },

    {
      department: "AFIMS (Accounting and Finance Information Management System)",
      reports: [
        {
          title: "City Revenue & Expenditure",
          href: "#",
          metrics: {
            "Total Revenue": "₱3.25B",
            "Total Expenditures": "₱2.91B",
            "Net Surplus": "₱340M",
            "Revenue Growth": "10.4%",
            "Operating Margin": "10.5%",
          },
        },
        {
          title: "Budget Utilization",
          href: "#",
          metrics: {
            "Average Budget Utilization": "86%",
            "Lowest Utilization": "61%",
            "Highest Utilization": "99%",
            "Departments Within Budget": "92%",
            "Remaining Budget": "₱450M",
          },
        },
      ],
    },

    {
      department: "HRIMS (Human Resource Information Management System)",
      reports: [
        {
          title: "Workforce Statistics",
          href: "#",
          metrics: {
            "Total Employees": "3,420",
            "Active Employees": "97%",
            "New Hires This Year": "285",
            "Permanent Employees": "2,480",
            "Contractual Employees": "940",
          },
        },
        {
          title: "Attendance & Workforce Productivity",
          href: "#",
          metrics: {
            "Average Attendance Rate": "95%",
            "Lowest Department Attendance": "81%",
            "Highest Department Attendance": "100%",
            "Average Leave Utilization": "7.2 days",
            "Employee Satisfaction Rate": "91%",
          },
        },
      ],
    },
  ];

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

          ${mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-[120%] lg:translate-x-0"
          }

          ${mobileMenuOpen ? "w-screen" : sidebarOpen ? "w-[380px]" : "w-[78px]"
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
                  <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="cyber-title text-xl font-bold md:text-2xl">
                        Smart City CCTV Monitoring
                      </h2>

                      <p className="text-sm text-cyan-200/70">
                        Live Geographic Intelligence System
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs text-cyan-300">
                        Biñan Laguna
                      </div>

                      <div className="rounded-full border border-lime-400/30 bg-lime-500/10 px-4 py-2 text-xs text-lime-300">
                        {cctvLocations.length} CCTV Online
                      </div>
                    </div>
                  </div>

                  {/* MAP */}
                  <div className="relative flex-1 overflow-hidden rounded-xl border border-cyan-400/20 bg-[#050816]">

                    <MapContainer
                      center={[14.3386, 121.0889]}
                      zoom={13}
                      scrollWheelZoom={true}
                      className="h-[500px] xl:h-full w-full z-0"
                    >
                      <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      {cctvLocations.map((camera) => (
                        <Marker
                          key={camera.id}
                          position={camera.position as [number, number]}
                          icon={createCctvIcon(camera.name)}
                        >
                          <Popup>
                            <div className="space-y-2 min-w-[180px]">
                              <h3 className="font-semibold">
                                {camera.name}
                              </h3>

                              <button
                                onClick={() =>
                                  window.open(
                                    camera.url,
                                    "_blank",
                                    "noopener,noreferrer"
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
                    </MapContainer>

                    {/* OVERLAY */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_70%)]" />

                    {/* LEGEND */}
                    <div className="absolute bottom-4 left-4 z-[1000] rounded-lg border border-cyan-400/30 bg-[#081121]/90 px-4 py-3 backdrop-blur">
                      <div className="mb-2 text-xs font-semibold text-cyan-300">
                        CCTV STATUS
                      </div>

                      <div className="flex items-center gap-2 text-xs text-white">
                        <span className="h-3 w-3 rounded-full bg-red-500" />
                        Active Camera
                      </div>
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

                {/* Mayors Weekly Briefer */}
                <div className="cyber-panel cyber-grid rounded-xl p-4">
                  <p className="mb-6 text-center text-sm text-cyan-100/80">
                    Mayor's Weekly Briefer
                  </p>

                  <button
                    onClick={() => setOpenWeeklyBriefer(true)}
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
                <p className="text-cyan-300/70">
                  Available Links & Resources
                </p>
              </div>

              <button
                onClick={() => setOpenWeeklyBriefer(false)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-2xl text-cyan-100 hover:bg-cyan-500/20"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">

              {weeklyBrieferData.map((department) => (
                <div
                  key={department.department}
                  className="rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-4"
                >
                  <h3 className="mb-4 text-lg font-semibold text-cyan-300">
                    {department.department}
                  </h3>

                  <div className="space-y-3">
                    {department.reports.map((report) => {
                      const key = `${department.department}-${report.title}`;

                      return (
                        <div
                          key={key}
                          className="rounded-lg border border-cyan-500/10"
                        >
                          <button
                            onClick={() =>
                              setOpenAccordion(
                                openAccordion === key ? null : key
                              )
                            }
                            className="flex w-full items-center justify-between p-4 text-left"
                          >
                            <a
                              href={report.href}
                              target="_blank"
                              className="font-medium text-cyan-200 underline"
                            >
                              {report.title}
                            </a>

                            <span>
                              {openAccordion === key ? "−" : "+"}
                            </span>
                          </button>

                          {openAccordion === key && (
                            <div className="border-t border-cyan-500/10 p-4">
                              <ul className="space-y-2">
                                {Object.entries(report.metrics).map(
                                  ([metric, value]) => (
                                    <li
                                      key={metric}
                                      className="flex justify-between text-sm"
                                    >
                                      <span className="text-cyan-100/80">
                                        {metric}
                                      </span>

                                      <span className="font-medium text-cyan-300">
                                        {value}
                                      </span>
                                    </li>
                                  )
                                )}
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
    </main>
  );
}
