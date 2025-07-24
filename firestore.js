// firestore.js
import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

// Add attendance record
export async function addAttendance(name, surname, phone, status) {
  const timestamp = new Date().toISOString();
  await addDoc(collection(db, 'attendance'), {
    name,
    surname,
    phone,
    status,
    timestamp
  });
}

// Get filtered attendance
export async function getAttendance(filters = {}) {
  let q = query(collection(db, 'attendance'), orderBy('timestamp', 'desc'));
  
  if (filters.name) {
    q = query(q, where('name', '>=', filters.name), where('name', '<=', filters.name + '\uf8ff'));
  }
  if (filters.status) {
    q = query(q, where('status', '==', filters.status));
  }
  if (filters.date) {
    const start = new Date(filters.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(filters.date);
    end.setHours(23, 59, 59, 999);
    q = query(q, where('timestamp', '>=', start.toISOString()), 
               where('timestamp', '<=', end.toISOString()));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}