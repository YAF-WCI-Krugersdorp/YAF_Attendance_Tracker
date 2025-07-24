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
    <div>
      <div>
        <input
          placeholder="Filter by name"
          value={filters.name || ''}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          aria-label="Filter by name"
        />
        <input
          placeholder="Filter by gender"
          value={filters.gender || ''}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          aria-label="Filter by gender"
        />
        <input
          placeholder="Filter by status"
          value={filters.status || ''}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          aria-label="Filter by status"
        />
        <input
          placeholder="Filter by date (YYYY-MM-DD)"
          value={filters.date || ''}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          aria-label="Filter by date"
        />
        {/* Add other filter controls */}
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Gender</th> {/* Add this */}
            <th>Phone</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>No records found.</td>
            </tr>
          ) : (
            records.map((r, idx) => (
              <tr key={idx}>
                <td>{r.name}</td>
                <td>{r.surname}</td>
                <td>{r.gender}</td> {/* Add this */}
                <td>{r.phone}</td>
                <td>{r.status}</td>
                <td>{r.timestamp}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button onClick={handleExport} aria-label="Export attendance as CSV">Export CSV</button>
    </div>
  );
}