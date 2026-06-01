'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';

import { DepartmentsModel, DepartmentReportsModel, ReportMetricsModel } from '@/app/generated/prisma/models';

interface DepartmentRecordFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (report: Partial<DepartmentReportsModel>, metrics: Partial<ReportMetricsModel>[]) => Promise<void>
  departmentId: DepartmentsModel['id']
  isLoading?: boolean
}

export default function DepartmentRecordFormModal({
  onClose,
  onSubmit,
  departmentId,
  isLoading = false,
}: DepartmentRecordFormModalProps) {
  const defaultFormData: Partial<DepartmentReportsModel> = useMemo(() => ({
    title: '',
    description: '',
    url: '',
    departmentId: departmentId,
  }), [])

  const [formData, setFormData] = useState<Partial<DepartmentReportsModel>>(defaultFormData)
  const [metrics, setMetrics] = useState<Partial<ReportMetricsModel>[]>([])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, metrics);
  }

  const addMetricsField = () => {
    setMetrics((prev) => [...prev, { name: '', value: 0 }])
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#12093b] via-[#1b0f5c] to-[#2d1b75] rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-semibold">
            Create Department Report
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter report title"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link
            </label>
            <input
              type="url"
              name="url"
              value={formData.url || ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter report link"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description ?? ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter report description"
            />
          </div>
          
          <button onClick={addMetricsField} type="button" className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-600">
            + Add Metric
          </button>

          {metrics.map((metric, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                name="name"
                value={metric.name}
                onChange={(e) => {
                  const newMetrics = [...metrics]
                  newMetrics[index].name = e.target.value
                  setMetrics(newMetrics)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Metric name"
              />
              <input
                type="text"
                name="value"
                value={metric.value}
                onChange={(e) => {
                  const newMetrics = [...metrics]
                  newMetrics[index].value = Number(e.target.value)
                  setMetrics(newMetrics)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Metric value"
              />
              <button type="button" onClick={() => {
                const newMetrics = [...metrics]
                newMetrics.splice(index, 1)
                setMetrics(newMetrics)
              }} className="px-4 py-2 text-white rounded-lg hover:bg-red-600">
                X
              </button>
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
