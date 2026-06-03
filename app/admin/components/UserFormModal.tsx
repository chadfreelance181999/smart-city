'use client';

import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';

import { UserModel } from '@/app/generated/prisma/models/User';

interface UserFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (user: Partial<UserModel>) => Promise<void>
  initialData?: UserModel | null
  isLoading?: boolean
}

export default function UserFormModal({
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: UserFormModalProps) {
  const defaultFormData: Partial<UserModel> = useMemo(() => ({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    userType: 'USER',
    password: '',
  }), [])

  const isEditMode = !!initialData

  const [formData, setFormData] = useState<Partial<UserModel>>(initialData || defaultFormData)


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
    await onSubmit(formData);
  }

  return (
    <div className="fixed inset-0 bg-[#1b0f5c] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#12093b] via-[#1b0f5c] to-[#2d1b75] rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-semibold">
            {isEditMode ? 'Edit User' : 'Create User'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter first name"
            />
          </div>

          {/* Middle Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Middle Name
            </label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName ?? ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter middle name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter last name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user email"
            />
          </div>

          {/* User type */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              User type
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {isEditMode && (
            <div className="text-sm text-gray-500">
              Leave password blank to keep current password
            </div>
          )}
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!isEditMode}
              minLength={!isEditMode ? 6 : undefined}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
