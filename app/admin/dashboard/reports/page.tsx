"use client";

import { useState, useEffect } from "react";

import { DepartmentsModel, DepartmentReportsModel, ReportMetricsModel } from "@/app/generated/prisma/internal/prismaNamespaceBrowser";

interface DepartmentWithRelations extends DepartmentReportsModel {
  department: DepartmentsModel;
}

export default function AdminDashboardDepartmentsPage() {
  const [departments, setDepartments] = useState<DepartmentWithRelations[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await fetch("/api/department-reports");
      const departments = await res.json();
      setDepartments(departments);
      setRefreshFlag(false);
    };

    if (refreshFlag) void fetchDepartments();
  }, [refreshFlag]);

  const handleDeleteReport = async (
    department: Partial<DepartmentReportsModel>,
  ) => {
    try {
      await fetch(`/api/department-reports/${department.id}`, {
        method: "DELETE",
      });
      setRefreshFlag(true);
    } catch (error) {
      console.error("Error deleting department:", error);
    } finally {
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#12093b] via-[#1b0f5c] to-[#2d1b75] text-white p-6 md:p-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Smart City Admin Panel
          </h1>

          <p className="text-gray-300 mt-3">Manage reports.</p>
        </div>
      </div>

      {/* USERS CRUD TABLE */}
      <section className="mt-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold">Reports</h2>
          </div>

          <a
            href={"/admin/dashboard/departments/"}
            className="px-5 py-3 rounded-2xl bg-cyan-400 text-black font-semibold hover:scale-105 transition"
          >
            + Add report
          </a>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Description</th>
                <th className="px-6 py-4 text-left">URL</th>
                <th className="px-6 py-4 text-left">Department</th>
                {/* <th className="px-6 py-4 text-left">Actions</th> */}
              </tr>
            </thead>

            <tbody>
              {departments.map((department) => (
                <tr
                  key={department.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4">{department.id}</td>

                  <td className="px-6 py-4">{department.title}</td>
                  <td className="px-6 py-4">{department.description}</td>
                  <td className="px-6 py-4">{department.url}</td>
                  <td className="px-6 py-4">{department.department?.subTitle}</td>

                  {/* <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="px-4 py-2 rounded-xl text-white font-medium hover:scale-105 transition"
                        onClick={() => {
                          setSelectedDepartment(department);
                          setIsDeptFormOpen(true);
                        }}
                      >
                        Update
                      </button>

                      <button
                        className="px-4 py-2 rounded-xl text-white font-medium hover:scale-105 transition"
                        onClick={() => {
                          setSelectedDepartment(department);
                          setIsReportFormOpen(true);
                        }}
                      >
                        Add report
                      </button>

                      <button
                        className="px-4 py-2 rounded-xl text-white font-medium hover:scale-105 transition"
                        onClick={() => handleDeleteReport(department)}
                      >
                        Delete
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
