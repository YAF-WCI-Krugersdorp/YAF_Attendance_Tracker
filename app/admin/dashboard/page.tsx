'use client';
import { getAttendance } from '@/firestore';
import { useState, useEffect } from 'react';

// Types for better safety
interface AttendanceRecord {
  name: string;
  surname: string;
  gender: string;
  phone: string;
  status: string;
  timestamp: string;
}

interface AttendanceFilters {
  name?: string;
  gender?: string;
  status?: string;
  date?: string; 
}

export default function AdminDashboard() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [filters, setFilters] = useState<AttendanceFilters>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        setError(null);
        const data = await getAttendance(filters);
        // Map data to AttendanceRecord shape if needed
        const mapped = data.map((item: any) => ({
          name: item.name || '',
          surname: item.surname || '',
          gender: item.gender || '', // Add this
          phone: item.phone || '',
          status: item.status || '',
          timestamp: item.timestamp || '',
        }));
        if (isMounted) setRecords(mapped);
      } catch (err) {
        setError('Failed to load attendance records.');
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, [filters]);

  // Escape CSV fields
  const escapeCSV = (field: string) =>
    `"${String(field).replace(/"/g, '""')}"`;

  const handleExport = () => {
    const csv = [
      ['Name', 'Surname', 'Gender', 'Phone', 'Status', 'Timestamp'], // Add Gender to CSV header
      ...records.map(r => [
        escapeCSV(r.name),
        escapeCSV(r.surname),
        escapeCSV(r.gender), // Add gender to CSV rows
        escapeCSV(r.phone),
        escapeCSV(r.status),
        escapeCSV(r.timestamp)
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'attendance.csv';
    link.click();
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto bg-white dark:bg-black rounded-xl shadow-lg p-8 border border-red-200 dark:border-red-700">
        <h1 className="text-3xl font-bold text-red-700 dark:text-red-400 mb-8 text-center">Admin Attendance Dashboard</h1>
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <input
            placeholder="Filter by name"
            value={filters.name || ''}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            aria-label="Filter by name"
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            placeholder="Filter by gender"
            value={filters.gender || ''}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            aria-label="Filter by gender"
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            placeholder="Filter by status"
            value={filters.status || ''}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            aria-label="Filter by status"
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            placeholder="Filter by date (YYYY-MM-DD)"
            value={filters.date || ''}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            aria-label="Filter by date"
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
                <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">Name</th>
                <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">Surname</th>
                <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">Gender</th>
                <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">Phone</th>
                <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">Status</th>
                <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500 dark:text-gray-400">No records found.</td>
                </tr>
              ) : (
                records.map((r, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-black"}>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{r.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{r.surname}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{r.gender}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{r.phone}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{r.status}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{r.timestamp}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleExport}
            aria-label="Export attendance as CSV"
            className="py-2 px-6 rounded bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors shadow focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}