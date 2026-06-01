"use client";
// app/admin/layout.tsx  (server component)
import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react'
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const noAuth = ["/admin/login"].includes(pathname);

  if (noAuth) {
    return <>{children}</>;
  }

  if (status === "unauthenticated") redirect("/admin/login");
  //   if ((session as any).user?.userType !== "ADMIN") redirect("/dashboard/login");

  return (
    <>
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
        ">
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
          left-0
          lg:left-[5px]
          lg:top-1/2
          lg:-translate-y-1/2
          lg:h-[calc(100vh-10px)]
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
            lg:h-[calc(100vh-10px)]
        "
        >
          {/* HEADER */}
          <div className="flex items-center border-b border-cyan-500/20 p-3 justify-center lg:justify-between">
            {(sidebarOpen || mobileMenuOpen) && (
              <span className="font-semibold text-2xl lg:text-xl text-cyan-300">
                Admin Panel
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

          {/* MODULES */}
          <div className="overflow-y-auto">
            <button
              key={"users-link"}
              onClick={() => redirect("/admin/dashboard/users")}
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
                👨🏻
              </div>

              {/* EXPANDED CONTENT */}
              {(sidebarOpen || mobileMenuOpen) && (
                <div className="flex flex-1 items-center justify-between">
                  <div className="text-left">
                    <p className="font-semibold text-cyan-100">Users</p>
                  </div>
                </div>
              )}
            </button>

            <button
              key={"departments-link"}
              onClick={() => redirect("/admin/dashboard/departments")}
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
                🧩
              </div>

              {/* EXPANDED CONTENT */}
              {(sidebarOpen || mobileMenuOpen) && (
                <div className="flex flex-1 items-center justify-between">
                  <div className="text-left">
                    <p className="font-semibold text-cyan-100">Modules</p>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 lg:pl-[90px]">
        {children}
      </div>
    </>
  );
}
